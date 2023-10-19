const {Posts} = require("../models");
const {Users} = require("../models");
const {Moderators} = require("../models");
const {Votes} = require("../models");
const {Subcruddits} = require("../models");
const validator = require('validator');
const {validateImage} = require("image-validator");


const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, ListBucketsCommand, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require('dotenv');
const { Pricing } = require("aws-sdk");
dotenv.config()
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY



const client = new S3Client({
   credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
   },
    region: bucketRegion
})


//TODO ONCE MORE ASSOCIATIONS ARE INCLUDED
module.exports = {
    
    createImgPost: async (req, res) => {

        const post = req.body
        post.UserId = req.UserId
        username = req.username
        
        if (!validateImgPost(post, req, res)) {
            return;
        }
        try {
            const subcruddit = await Subcruddits.findOne({
                where: {
                    subcrudditName: post.subcrudditName
                }
            })
            if (!subcruddit) {
                return res.status(400).send({message: "you must post to a valid subcruddit"})
            }
            post.SubcrudditId = subcruddit.id
            const imgName = username + Date.now() + ".jpg"

            
            const params = {
                Bucket: bucketName,
                Key: imgName,
                Body: req.file.buffer,
                ContentType: req.file.mimetype
            }
            const command = new PutObjectCommand(params)
            try {
                const data = await client.send(command)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
            
            post.content = imgName;
            post.layer = 0;
            post.points = 1;
            const newPost = await Posts.create(post)
            const vote = {
                UserId: newPost.UserId,
                PostId: newPost.id,
                liked: true
            }
            await Votes.create(vote)
            return res.status(201).send(post)
     

        } catch(error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})  
        }
    },

    createTextPost: async (req, res) => {
        try {
            const post = req.body
            post.UserId = req.UserId;
            if (!validateTextPost(post, req, res)) {
                return;
            }
            post.layer = 0; 
            const user = await Users.findAll({
                where: {
                    id: post.UserId
                }
            })
            if (user.length < 1){
                return res.status(400).json({message : "Create post from valid user account", user: false})
            }
            const subcruddit = await Subcruddits.findOne({
                where: {
                    subcrudditName: post.subcrudditName
                }
            })
            if (!subcruddit){
                return res.status(400).json({message : "Create post to valid subcruddit", user: false})
            }
            post.SubcrudditId = subcruddit.id;
            post.points = 1;

            newPost = await Posts.create(post);
            const vote = {
                UserId: newPost.UserId,
                PostId: newPost.id,
                liked: true
            }
            await Votes.create(vote)
            if (newPost.id) {
                console.log(newPost)
                return res.status(201).json(newPost)
            } else {
                return res.status(500).json({message: "something went wrong creating your post."})
            }
        } catch(error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})  
        }

    },
    //TODO add transactions
    // TODO ensure deleted users display as "deleted-user"
    createComment: async (req, res) => {
        const comment = req.body
        comment.UserId = req.UserId;

        const postId = req.params.id
        let layer = 0;
        let parentPostId = 0;
        let subcrudditId = 0;
        if (!validateComment(comment, postId, req, res)){
            return;
        }
        try {
            const user = await Users.findByPk(comment.UserId)
            if (user.length < 1){
                return res.status(400).json({message : "Create post from valid user account", user: false})
            } 

            const originalPost = await Posts.findOne({
                where: {
                    id: postId
                }
            })
            if(!originalPost) {
                res.status(400).send({
                    message: "You must reply to a valid post."
            })
            }
            comment.SubcrudditId = originalPost.SubcrudditId;
            comment.layer = originalPost.layer + 1;
            comment.parentId = originalPost.id
            comment.postType = "comment";
            comment.points = 1;
            let isComment;
            if (originalPost.layer === 0) {
                comment.postId = originalPost.id
                isComment = false;
            } else {
                comment.postId = originalPost.postId
                isComment = true;
            }
            parentId = originalPost.parentId 
            originalPost.children_count += 1;
            await originalPost.save()

            while (isComment) {
                const parent = await Posts.findByPk(parentId)
                parent.children_count+= 1;
                layer = parent.layer
                parentId = parent.parentId
                await parent.save()
                if (layer === 0) {
                    isComment = false;
                }
            }
            
            const newComment = await Posts.create(comment);
            const returnObj = {
            id: newComment.id,
            UserId: newComment.UserId,
            username: user.username,
            content: newComment.content,
            children_count: newComment.children_count,
            points: newComment.points,
            layer: newComment.layer,
            isStickied: newComment.isStickied,
            isActive: newComment.isActive,
            createdAt: newComment.createdAt,
            }


 
            const vote = {
                UserId: newComment.UserId,
                PostId: newComment.id,
                liked: true
            }
            await Votes.create(vote)
            if (newComment) {
                return res.status(201).json(returnObj) 
            }
            return res.status(400).json({message: "something went wrong"})

        } catch(error) {
            console.log(error);
            return res.status(500).json({message: "Internal Server Error"})  
        }
    },
    findAllActivePosts: async(req, res) => {
        const order = req.params.order
        let activePosts = [];
        try {
        if (order === "new"){
            activePosts = await Posts.findAll({
                where: {
                    isActive: true,
                    layer: 0
                }, 
                order: [['isStickied', 'DESC'], ['createdAt', 'DESC']],
                include: [{
                    model: Subcruddits,
                    attributes: ['subcrudditName']  
                  }, {
                    model: Users,
                    attributes: ['username']  
                  }] 
            })
        } else if (order === "hot"){
            activePosts = await Posts.findAll({
                where: {
                    isActive: true,
                    layer: 0
                }, 
                order: [['isStickied', 'DESC'], ['points', 'DESC']],
                include: [{
                    model: Subcruddits,
                    attributes: ['subcrudditName']  
                  }, {
                    model: Users,
                    attributes: ['username']  
                  }] 
            })
        } else {
            res.status(400).send({
                message: order + " is not a valid request parameter."
            });
            return false;
        }


 
        for (let post of activePosts) {
            
            if (post.postType === "image") {
                const imgParams = {
                    Bucket: bucketName,
                    Key: post.content
                }
                const command = new GetObjectCommand(imgParams)
                const url = await getSignedUrl(client, command, {expiresIn: 3600})
                post.content = url;
            }
        }

        const returnObj = activePosts.map((post) => ({
            id: post.id,
            UserId: post.UserId,
            SubcrudditId: post.SubcrudditId, 
            title: post.title,
            postType: post.postType,
            content: post.content,
            caption: post.caption,
            children_count: post.children_count,
            points: post.points,
            isStickied: post.isStickied,
            createdAt: post.createdAt,
            subcrudditName: post.Subcruddit.subcrudditName,
            username: post.User.username


        }));


        res.status(200).send(returnObj);
        } catch (error){
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})    
        }
    },
    findComments : async(req, res) => {
        try {
            const postId = req.params.id;
            const order = req.params.order;
            
            const originalPost = await Posts.findOne({
             where: {
                 id: postId
             }
         })
         if (!originalPost) {
             return res.status(500).send({
                 message: "Error loading comments."
             });
             
         }
     
            let parentComments=[];
     
     
            if (order === "new"){
             parentComments = await Posts.findAll({
                 where: {
                     parentId: postId
                 },
                 order: [['isStickied', 'DESC'], ['createdAt', 'DESC']],
                 include: [{
                    model: Users,
                    attributes: ['username', 'id'] 
                  }] 
             })
              } else if (order === "hot"){
             parentComments = await Posts.findAll({
                 where: {
                     parentId: postId,                    
                 },
                 order: [['isStickied', 'DESC'], ['points', 'DESC']],
                 include: [{
                    model: Users,
                    attributes: ['username', 'id'] 
                  }] 
             })
              } else {
             res.status(400).send({
                 message: order + " is not a valid request parameter."
             });
             return false;
         }
         
         for (let comment of parentComments) {
            if (!comment.isActive){
                comment.content = "";
                comment.User.username ="deleted comment"
            }
         }

         const returnObj = parentComments.map((comment) => ({
            id: comment.id,
            UserId: comment.UserId,
            username: comment.User.username,
            content: comment.content,
            children_count: comment.children_count,
            points: comment.points,
            layer: comment.layer,
            isStickied: comment.isStickied,
            isActive: comment.isActive,
            createdAt: comment.createdAt,
        }));

   

        res.status(200).send(returnObj);
     
        } catch (error){
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})  
        }
    }, 
    findActivePost: async(req, res) => {
        const postId = req.params.id;
        try {
            const originalPost = await Posts.findOne({
                where: {
                    id: postId,
                    isActive: true,
                    parentId: null
                },
                include: [{
                    model: Users,
                    attributes: ['username', 'id'] 
                  }] 
            })

            if (!originalPost){
                return res.status(400).send({
                    message:  "Please select a valid post."
                });
            }

            if (originalPost.postType === "image") {
                const imgParams = {
                    Bucket: bucketName,
                    Key: originalPost.content
                }
                const command = new GetObjectCommand(imgParams)
                const url = await getSignedUrl(client, command, {expiresIn: 3600})
                originalPost.content = url;
            }





            const responseObj = {
                id: originalPost.id,
                UserId: originalPost.UserId,
                title: originalPost.title,
                postType: originalPost.postType,
                content: originalPost.content,
                caption: originalPost.caption, 
                children_count: originalPost.children_count,
                points: originalPost.points,
                isStickied: originalPost.isStickied,
                createdAt: originalPost.createdAt,
                username: originalPost.User.username
            }



            return res.status(200).send(responseObj);

        } catch(error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})    
        }
    },
    findAllActivePostsSubcruddit: async(req, res) => {
        const order = req.params.order
        const subName = req.params.subcruddit
        let activePosts;
        const sub = await Subcruddits.findOne({
            where: {
                subcrudditName: subName
            }
        });
        if (!sub) {
            return res.status(400).send({message: "that subcruddit does not exist"})
        }
        if (order === "new"){
            activePosts = await Posts.findAll({
                where: {
                    isActive: true,
                    layer: 0,
                    SubcrudditId: sub.id
                }, 
                order: [['isStickied', 'DESC'], ['createdAt', 'DESC']],
                include: [{
                    model: Users,
                    attributes: ['username', 'id'] 
                  }, {
                    model: Subcruddits,
                    attributes: ['subcrudditName']  
                  }]  
            })
        } else if (order === "hot"){
            activePosts = await Posts.findAll({
                where: {
                    isActive: true,
                    layer: 0,
                    SubcrudditId: sub.id
                }, 
                order: [['isStickied', 'DESC'], ['points', 'DESC']],
                include: [{
                    model: Users,
                    attributes: ['username', 'id'] 
                  }, {
                    model: Subcruddits,
                    attributes: ['subcrudditName']  
                  }]  
            })
        } else {
            return res.status(400).send({
                message: order + " is not a valid request parameter."
            });
            
        }
        for (let post of activePosts) {
            
            if (post.postType === "image") {
                const imgParams = {
                    Bucket: bucketName,
                    Key: post.content
                }
                const command = new GetObjectCommand(imgParams)
                const url = await getSignedUrl(client, command, {expiresIn: 3600})
                post.content = url;
            }
        }

        const returnObj = activePosts.map((post) => ({
            id: post.id,
            UserId: post.UserId,
            SubcrudditId: post.SubcrudditId, 
            title: post.title,
            postType: post.postType,
            content: post.content,
            caption: post.caption,
            children_count: post.children_count,
            points: post.points,
            isStickied: post.isStickied,
            createdAt: post.createdAt,
            subcrudditName: post.Subcruddit.subcrudditName,
            username: post.User.username


        }));

        res.status(200).send(returnObj);
    },
    findAllActivePostsUser: async(req, res) => {
        const userId = req.params.id
        try {
            const user = await Users.findByPk(userId)
            if (!user) {
                return res.status(400).send({message: "That user does not exist."})
            }
            activePosts = await Posts.findAll({
                where: {
                    isActive: true,
                    layer: 0,
                    UserId: userId
                }, 
                order: [['createdAt', 'DESC']],
                include: [{
                    model: Subcruddits,
                    attributes: ['subcrudditName']  
                  }]  
            })

            for (let post of activePosts) {
            
                if (post.postType === "image") {
                    const imgParams = {
                        Bucket: bucketName,
                        Key: post.content
                    }
                    const command = new GetObjectCommand(imgParams)
                    const url = await getSignedUrl(client, command, {expiresIn: 3600})
                    post.content = url;
                }
            }



            const returnObj = activePosts.map((post) => ({
                id: post.id,
                postId: post.postId,
                parentId: post.parentId,
                UserId: post.UserId,
                UserName: user.username,
                SubcrudditId: post.SubcrudditId, 
                title: post.title,
                postType: post.postType,
                content: post.content,
                caption: post.caption,
                children_count: post.children_count,
                points: post.points,
                isStickied: post.isStickied,
                createdAt: post.createdAt,
                subcrudditName: post.Subcruddit.subcrudditName,
    
    
    
            }));

            res.status(200).send(returnObj);

        } catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Server Error"}) 
        }
    },
    findAllActiveCommentsUser: async (req, res) => {
        const userId = req.params.id
        try {
            activePosts = await Posts.findAll({
                where: {
                    isActive: true,
                    postType: "comment",
                    UserId: userId
                }, 
                order: [['createdAt', 'DESC']],
                include: [{
                    model: Users,
                    attributes: ['username', 'id'] 
                  }, {
                    model: Subcruddits,
                    attributes: ['subcrudditName'] 
                  }] 
            })

            for (let post of activePosts){
                        const originalPost = await Posts.findByPk(post.postId, {
                            include: [{
                                model: Users,
                                attributes: ['username']  
                              }]
                        })
                        const originalObj = {
                            id: originalPost.id, 
                            title: originalPost.title,
                            username: originalPost.User.username

                        }
                        post.postId = originalObj   
            }

            const returnObj = activePosts.map((post) => ({
                id: post.id,
                postId: post.postId,
                parentId: post.parentId,
                UserId: post.UserId,
                SubcrudditId: post.SubcrudditId, 
                content: post.content,
                children_count: post.children_count,
                points: post.points,
                isStickied: post.isStickied,
                createdAt: post.createdAt,
                subcrudditName: post.Subcruddit.subcrudditName,
    

            }));
            res.status(200).send(returnObj);

        } catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Server Error"}) 
        }
    }, 
    //TODO change when impl auth - comments 
    editComment: async (req, res) => {
        try {
       const postId = req.params.id
       const comment = req.body
       comment.UserId = req.UserId;
        userId = req.UserId
        
        if (!validator.isLength(comment.content, {min: 2, max:5000})){
            res.status(400).json({message: "Comments must be between 2 and 5000 characters"}) 
        }
        const post = await Posts.findOne({
            where: {
                id: postId,
                postType: "comment",
                isActive: true
            }
        })
        if (!post) {
            res.status(400).json({message: "Please select a valid post"}) 
        }
        if (post.UserId !== userId) {
            res.status(400).json({message: "You are not authorized to edit a comment that isn't yours."}) 

        }
        post.content = comment.content;
        post.save()
        .then(()=> {
            res.status(200).send({message: "Successfully edited comment", comment: post}) 
        }).catch((error)=> {
            res.status(500).send({message: "Internal Server Error", error: error}) 
        })
    } catch (error) {
        res.status(500).send({message: "Internal Server Error", error: error}) 
    }
        
    },
    editPost: async (req, res) => {
        try {
            const postId = req.params.id
            const editedPost = req.body
            userId = req.UserId

             if (!validator.isLength(editedPost.content, {min: 2, max:50000})){
                 res.status(400).json({message: "Posts must be between 2 and 50, 000 characters"}) 
             }
             if (editedPost.postType === "image"){
                res.status(400).json({message: "You cannot edit image posts"}) 
             }
             const post = await Posts.findOne({
                 where: {
                     id: postId,
                     layer: 0,
                     isActive: true,
                     UserId: userId
                 }
             })
             if (!post) {
                 res.status(400).json({message: "Please select a valid post"}) 
             }

             post.content = editedPost.content;
             post.save()
             .then(()=> {
                 res.status(200).send({message: "Successfully edited comment", comment: post}) 
             }).catch((error)=> {
                 res.status(500).send({message: "Internal Server Error", error: error}) 
             })
         } catch (error) {
             res.status(500).send({message: "Internal Server Error", error: error}) 
         } 
    },
    //TODO change when impl auth - comments
    deletePost: async (req, res) => {
        const postId = req.params.id;
        const requestId = req.UserId; 
        try {
            const thePost = await Posts.findByPk(postId, {
                where: {
                    isActive: true
                }
            })
            if(!thePost) {
                return res.status(404).send({message: "Could not find post"});
            }
            if (req.role !== 'admin' && requestId!== thePost.UserId){
                const mod = await Moderators.findOne({
                    where: {
                        UserId: requestId,
                        SubcrudditId: thePost.SubcrudditId
                    }
                })
                if (!mod) {
                    return res.status(401).send({message: "You do not have permission to delete this post"});
                }

            }
            thePost.isActive = false;
            thePost.save()
            .then(()=> {
                return res.status(200).send({id: thePost.id, isActive: thePost.isActive});
            }).catch((error)=> {
                return res.status(500).send({message: "Could not delete post", error: error});
            })


        } catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Server Error"}) 
        }

    }, 
    findAllByUser: async (req, res) => {
        
        try {
            const userId = req.params.id
            const user = await Users.findByPk(userId);

            if (!user) {
                return res.status(400).send({message: "That user does not exist."})
            }
            activePosts = await Posts.findAll({
                where: {
                    isActive: true,
                    UserId: userId
                }, 
                order: [['createdAt', 'DESC']],
                include: [{
                    model: Users,
                    attributes: ['username', 'id'] 
                  }, {
                    model: Subcruddits,
                    attributes: ['subcrudditName'] 
                  }]  
            })
            for (let post of activePosts){
                if (post.postType === "comment") {
                    
                        const originalPost = await Posts.findByPk(post.postId, {
                            include: [{
                                model: Users,
                                attributes: ['username']  
                              }]
                        })
                        const originalObj = {
                            id: originalPost.id, 
                            title: originalPost.title,
                            username: originalPost.User.username

                        }
                        post.postId = originalObj 
                } else if (post.postType === "image") {
                            const imgParams = {
                                Bucket: bucketName,
                                Key: post.content
                            }
                            const command = new GetObjectCommand(imgParams)
                            const url = await getSignedUrl(client, command, {expiresIn: 3600})
                            post.content = url;
                }
            }

            const returnObj = activePosts.map((post) => ({
                id: post.id,
                postId: post.postId,
                parentId: post.parentId,
                UserId: post.UserId,
                UserName: user.username,
                SubcrudditId: post.SubcrudditId, 
                title: post.title,
                postType: post.postType,
                content: post.content,
                caption: post.caption,
                children_count: post.children_count,
                points: post.points,
                isStickied: post.isStickied,
                createdAt: post.createdAt,
                subcrudditName: post.Subcruddit.subcrudditName,
    
    

            }));
            res.status(200).send(returnObj);

        } catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Server Error"}) 
        }
    },
    //TODO change when impl auth - comments
    toggleLock: async (req, res) => {
        const postId = req.params.id;
        const requestId = req.UserId; 
        try {
            const thePost = await Posts.findOne({
                where: {
                    id : postId,
                    isActive: true,
                    layer: 0
                }
            })
            if(!thePost) {
                return res.status(404).send({message: "Could not find post"});
            }
            if (req.role === 'user' ){
                const mod = await Moderators.findOne({
                    where: {
                        UserId: requestId,
                        SubcrudditId: thePost.SubcrudditId
                    }
                })
                if (!mod) {
                    return res.status(401).send({message: "You do not have permission to delete this post"});
                }

            }
           
            thePost.isLocked = !thePost.isLocked;
            thePost.save()
            .then(()=> {
                return res.status(200).send({id: thePost.id, isLocked: thePost.isLocked});
            }).catch((error)=> {
                return res.status(500).send({message: "Could not lock post", error: error});
            })

            
        } catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Server Error"}) 
        }    
    },
    toggleSticky: async (req, res) => {
        const postId = req.params.id;
        const requestId = req.UserId; 
        try {
            const thePost = await Posts.findOne({
                where: {
                    id : postId,
                    isActive: true,
                }
            })
            if(!thePost) {
                return res.status(404).send({message: "Could not find post"});
            }
            if (req.role === 'user' ){
                const mod = await Moderators.findOne({
                    where: {
                        UserId: requestId,
                        SubcrudditId: thePost.SubcrudditId
                    }
                })
                if (!mod) {
                    return res.status(401).send({message: "You do not have permission to sticky this post"});
                }

            }
            const isStickied = thePost.isStickied;
            thePost.isStickied = !isStickied;
            thePost.save().then(()=> {
                return res.status(200).send({id: thePost.id, isStickied: thePost.isStickied});
            }).catch((error) => {
                return res.status(500).send({message: "Could not change post sticky", error: error});
            })
         
        } catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Server Error"}) 
        }  
    }


}

function validateImgPost(post, req, res) {
    const file = req.file
    if (!post.UserId || !post.title || !post.postType || !req.file || !post.subcrudditName)  {
        res.status(400).send({
            message: "You must send user id, a post title, a post type, a subcruddit name, and post content ."
        });
        return false;
    }
    if (post.parentId|| post.postId){
            res.status(400).send({
            message: "Please do not provide a parent ID or a post ID."
        });
        return false;
    }
    if (post.caption == undefined) {
                res.status(400).send({
            message: "For images, you must provide a capition."
        });
        return false;
    }
    if ( !validator.isLength(post.caption, {min: 10, max:200})) {
                res.status(400).send({
            message: "Your image caption must be between 10 and 200 characters long."
        });
        return false;
    }

    if (!validator.isLength(post.title, {min: 10, max:360})){
        res.status(400).send({
            message: "Title must be between 10 and 360 characters long."
        });
        return false;
    }
    if (post.postType !== "image"){
                res.status(400).send({
            message: "Post type must be an imagetext."
        });
        return false;
    }
    
    const fileValidation = async (file) => {
        const isValidImage = await validateImage(file);
        if (!isValidImage){
            res.status(400).send({message: "please send valid image"})
        }
        return false;
      }
    return true;

}

function validateTextPost(post, req, res) {
    if (!post.UserId || !post.title || !post.postType || !post.content)  {
        res.status(400).send({
            message: "You must send user id, a post title, a post type, and post content ."
        });
        return false;
    }
    if (post.parentId|| post.postId ){
            res.status(400).send({
            message: "Please do not provide a parent ID or a post ID."
        });
        return false;
    }

    if ( (post.caption !== undefined || post.mimetype !== undefined)) {
                res.status(400).send({
            message: "Please do not provide a caption or mimetype for a text post."
        });
        return false;
    }
    if (!validator.isLength(post.title, {min: 10, max:360})){
        res.status(400).send({
            message: "Title must be between 10 and 360 characters long."
        });
        return false;
    }
    if (post.postType !== "text"){
                res.status(400).send({
            message: "Post type must be text."
        });
        return false;
    }
    if ( !validator.isLength(post.content, {min: 10, max:50000})) {
        res.status(400).send({
            message: "Post content must be between 10 and 50 000 characters ."
        });
        return false;
    }

    return true;

}

function validateComment(comment, postId, req, res) {
    if (!postId || !comment.UserId  || !comment.content) {
        res.status(400).send({
            message: "You must send user id, subcruddit id, a post type, and post content ."
        });
        return false;
    }
    if (!validator.isLength(comment.content, {min: 2, max:5000})) {
        res.status(400).send({
            message: "Comment must be between 2 and 5000 characters long."
        });
        return false;
    }

    return true;
}

