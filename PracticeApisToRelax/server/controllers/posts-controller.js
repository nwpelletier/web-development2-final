const {Posts} = require("../models");
const {Users} = require("../models");
const {Moderators} = require("../models");
const {Votes} = require("../models");
const {Subcruddits} = require("../models");
const validator = require('validator');

//TODO ONCE MORE ASSOCIATIONS ARE INCLUDED
module.exports = {
    createPost: async (req, res) => {
        const post = req.body
        // post.UserId = req.UserId
        try {
            if (!validatePost(post, req, res)) {
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
            const subcruddit = await Subcruddits.findAll({
                where: {
                    subcrudditName: post.subcrudditName
                }
            })
            if (subcruddit.length < 1){
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
       // comment.UserId = req.UserId;

        const postId = req.params.id
        let layer = 0;
        let parentPostId = 0;
        let subcrudditId = 0;
        if (!validateComment(comment, postId, req, res)){
            return;
        }
        try {
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
            //comment.SubcrudditId = originalPost.SubcrudditId;
            const user = await Users.findByPk(comment.UserId)
            if (user.length < 1){
                return res.status(400).json({message : "Create post from valid user account", user: false})
            } 

            if (originalPost.layer !== 0){
                const parentPost = await Posts.findOne({
                    where: {
                        id: originalPost.postId
                    }
                })
                parentPost.children_count++;
                parentPostId = parentPost.id;
                try {
                    await parentPost.save()
                } catch (error) {
                    return res.status(500).json({message : "Could not update parent comment children", error: error})
                }
                
            } else {
                parentPostId = postId;
            }
            originalPost.children_count++;
            layer = originalPost.layer + 1;
            subcrudditId = originalPost.SubcrudditId;
            try {
                await originalPost.save()
            } catch (error){
                return res.status(500).json({message : "Could not update parent comment children", error: error})
            }

            comment.postId = parentPostId;
            comment.layer = layer;
            comment.parentId = postId;
            comment.SubcrudditId = subcrudditId;
            comment.postType = "comment";
            comment.points = 1;

            const newComment = await Posts.create(comment);
            const vote = {
                UserId: newComment.UserId,
                PostId: newComment.id,
                liked: true
            }
            await Votes.create(vote)
            if (newComment) {
                return res.status(201).json(newComment) 
            }
            return res.status(400).json({message: "something went wrong"})

        } catch(error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})  
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
                    model: Users,
                    attributes: ['username', 'id'] 
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



            const returnObj = activePosts.map((post) => ({
                id: post.id,
                postId: post.postId,
                parentId: post.parentId,
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
     //   userId = req.UserId
        const userId = comment.UserId
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
          //   userId = req.UserId
             const userId = editedPost.UserId
             if (!validator.isLength(editedPost.content, {min: 2, max:50000})){
                 res.status(400).json({message: "Posts must be between 2 and 50, 000 characters"}) 
             }
             if (editedPost.postType === "image"){
                console.log('hello')
             }
             const post = await Posts.findOne({
                 where: {
                     id: postId,
                     layer: 0,
                     isActive: true
                 }
             })
             if (!post) {
                 res.status(400).json({message: "Please select a valid post"}) 
             }
             if (post.UserId !== userId) {
                 res.status(400).json({message: "You are not authorized to edit a post that isn't yours."}) 
     
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
    //TODO change when impl auth - comments
    deletePost: async (req, res) => {
        const postId = req.params.id;
    //    const requestId = req.UserId; 
        try {
            const thePost = await Posts.findByPk(postId, {
                where: {
                    isActive: true
                }
            })
            if(!thePost) {
                return res.status(404).send({message: "Could not find post"});
            }
            // if (req.role !== 'admin' && req.UserId !== thePost.UserId){
            //     const mod = await Moderators.findOne({
            //         where: {
            //             UserId: req.UserId,
            //             SubcrudditId: thePost.SubcrudditId
            //         }
            //     })
            //     if (!mod) {
            //         return res.status(401).send({message: "You do not have permission to delete this post"});
            //     }

            // }
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
        const userId = req.params.id
        try {
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
                   
                }
            }

            const returnObj = activePosts.map((post) => ({
                id: post.id,
                postId: post.postId,
                parentId: post.parentId,
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
            // if (req.role === 'user' ){
            //     const mod = await Moderators.findOne({
            //         where: {
            //             UserId: req.UserId,
            //             SubcrudditId: thePost.SubcrudditId
            //         }
            //     })
            //     if (!mod) {
            //         return res.status(401).send({message: "You do not have permission to delete this post"});
            //     }

            // }
           
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
            // if (req.role === 'user' ){
            //     const mod = await Moderators.findOne({
            //         where: {
            //             UserId: req.UserId,
            //             SubcrudditId: thePost.SubcrudditId
            //         }
            //     })
            //     if (!mod) {
            //         return res.status(401).send({message: "You do not have permission to sticky this post"});
            //     }

            // }
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

function validatePost(post, req, res) {
    if (!post.UserId || !post.title || !post.postType || !post.content)  {

        res.status(400).send({
            message: "You must send user id, a post title, a post type, and post content ."
        });
        return false;
    }
    if (post.parentId|| post.postId){
            res.status(400).send({
            message: "Please do not provide a parent ID or a post ID."
        });
        return false;
    }
    if (post.postType === "image" && (post.caption == undefined || post.mimetype == undefined)) {
                res.status(400).send({
            message: "For images, you must provide a capition and a mimetype."
        });
        return false;
    }
    if (post.postType === "image" && !validator.isLength(post.caption, {min: 10, max:200})) {
                res.status(400).send({
            message: "Your image caption must be between 10 and 200 characters long."
        });
        return false;
    }
    if (post.postType === "text" && (post.caption !== undefined || post.mimetype !== undefined)) {
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
    if (post.postType !== "image" && post.postType !== "text"){
                res.status(400).send({
            message: "Post type must be an image or text."
        });
        return false;
    }
    if (post.postType == "text" && !validator.isLength(post.content, {min: 10, max:50000})) {
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

