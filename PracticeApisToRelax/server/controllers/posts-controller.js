const {Posts} = require("../models");
const {Users} = require("../models");
const validator = require('validator');

module.exports = {
    createPost: async (req, res) => {
        const post = req.body
        try {
            if (!validatePost(post, req, res)) {
                return;
            }
            post.layer = 0; 
            // const user = await Users.findAll({
            //     where: {
            //         id: post.UserId
            //     }
            // })
            // if (user.length < 1){
            //     return res.status(400).json({message : "Create post from valid user account", user: false})
            // }
            // const subcruddit = await Subcruddits.findAll({
            //     where: {
            //         subcrudditName: post.subcrudditName
            //     }
            // })
            // if (subcruddit.length < 1){
            //     return res.status(400).json({message : "Create post to valid subcruddit", user: false})
            // }
            // post.SubcrudditId = subcruddit.id;
            newPost = await Posts.create(post);
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
    createComment: async (req, res) => {
        const comment = req.body
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
                        // const user = await Users.findAll({
            //     where: {
            //         id: post.UserId
            //     }
            // })
            // if (user.length < 1){
            //     return res.status(400).json({message : "Create post from valid user account", user: false})
            // } 

            if (originalPost.layer !== 0){
                const parentPost = await Posts.findOne({
                    where: {
                        id: originalPost.postId
                    }
                })
                parentPost.children_count++;
                parentPostId = parentPost.id;
                await parentPost.save();
            } else {
                parentPostId = postId;
            }
            originalPost.children_count++;
            layer = originalPost.layer + 1;
            subcrudditId = originalPost.SubcrudditId;
            await originalPost.save();
            comment.postId = parentPostId;
            comment.layer = layer;
            comment.parentId = postId;
            comment.SubcrudditId = subcrudditId;

            const newComment = await Posts.create(comment);
            if (comment) {
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
        if (order === "new"){
            activePosts = await Posts.findAll({
                where: {
                    isActive: true,
                    layer: 0
                }, 
                order: [['isStickied', 'DESC'], ['createdAt', 'DESC']]
            })
        } else if (order === "hot"){
            activePosts = await Posts.findAll({
                where: {
                    isActive: true,
                    layer: 0
                }, 
                order: [['isStickied', 'DESC'], ['points', 'DESC']],
            })
        } else {
            res.status(400).send({
                message: order + " is not a valid request parameter."
            });
            return false;
        }
        res.status(200).send(activePosts);
    },
    findActiveComments : async(req, res) => {
        try {
            const postId = req.params.id;
            const order = req.params.order;
            
            const originalPost = await Posts.findOne({
             where: {
                 id: postId
             }
         })
         if (!originalPost) {
             return res.status(400).send({
                 message: order + " is not a valid request parameter ."
             });
             
         }
     
            let parentComments=[];
     
     
            if (order === "new"){
             parentComments = await Posts.findAll({
                 where: {
                     parentId: postId,
                     isActive: true
                    
                 },
                 order: [['isStickied', 'DESC'], ['createdAt', 'DESC']]
             })
              } else if (order === "hot"){
             parentComments = await Posts.findAll({
                 where: {
                     parentId: postId,
                     isActive: true
                    
                 },
                 order: [['isStickied', 'DESC'], ['points', 'DESC']]
             })
              } else {
             res.status(400).send({
                 message: order + " is not a valid request parameter."
             });
             return false;
         }
         res.status(200).send(parentComments);
     
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
                }
            })

            if (!originalPost){
                return res.status(400).send({
                    message:  "Please select a valid post."
                });
            }
            return res.status(200).send(originalPost);

        } catch(error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})    
        }
    },
    findAllActivePostsSubcruddit: async(req, res) => {
        const order = req.params.order
        const subcrudditId = req.params.id
        let activePosts;
        if (order === "new"){
            activePosts = await Posts.findAll({
                where: {
                    isActive: true,
                    layer: 0,
                    SubcrudditId: subcrudditId
                }, 
                order: [['isStickied', 'DESC'], ['createdAt', 'DESC']]
            })
        } else if (order === "hot"){
            activePosts = await Posts.findAll({
                where: {
                    isActive: true,
                    layer: 0,
                    SubcrudditId: subcrudditId
                }, 
                order: [['isStickied', 'DESC'], ['points', 'DESC']],
            })
        } else {
            return res.status(400).send({
                message: order + " is not a valid request parameter."
            });
            
        }

        res.status(200).send(activePosts);
    },
    findAllActivePostsUser: async(req, res) => {
        const userId = req.params.id
        try {
            activePosts = await Posts.findAll({
                where: {
                    isActive: true,
                    layer: 0,
                    UserId: userId
                }, 
                order: [['createdAt', 'DESC']],
            })
            res.status(200).send(activePosts);

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
            })
            res.status(200).send(activePosts);

        } catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Server Error"}) 
        }
    }, 
    editComment: async (req, res) => {
        //TODO
    },
    editPost: async (req, res) => {
        //TODO 
    },
    deleteComment: async (req, res) => {
        //TODO
    },
    deletePost: async (req, res) => {
        //TODO
    }

}

function validatePost(post, req, res) {
    if (!post.UserId || !post.SubcrudditId || !post.title || !post.postType || !post.content)  {
        console.log("user id" + post.UserId);
        console.log("subc id" + post.SubcrudditId)
        console.log("title" + post.title)
        console.log("post type" + post.postType)
        console.log("content" + post.content)
        res.status(400).send({
            message: "You must send user id, subcruddit id, a post title, a post type, and post content ."
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
    if (!postId || !comment.UserId || !comment.postType || !comment.content) {
        res.status(400).send({
            message: "You must send user id, subcruddit id, a post type, and post content ."
        });
        return false;
    }
    if (comment.postType !== "comment"){
        res.status(400).send({
            message: "The only valid type for commenting is a text."
        });
        return false;
    }
    if (!validator.isLength(post.content, {min: 2, max:5000})) {
        res.status(400).send({
            message: "Comment must be between 2 and 5000 characters long."
        });
        return false;
    }

    return true;
}

//  id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
// },
// UserId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
// },
// SubcrudditId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
// },
// parentId: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
// },
// postId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
// },
// title: {
//     type: DataTypes.STRING(360),
//     allowNull: true,
//     unique: true
// }, 
// type: {
//     type: DataTypes.ENUM("image", "text"),
//     allowNull: false,
// }, 
// content : {
//     type: DataTypes.STRING(50000),
//     allowNull: false,
// }, 
// caption: {
//     type: DataTypes.STRING(200),
//     allowNull: true,
// }, 
// mimeType : {
//     type: DataTypes.STRING(200),
//     allowNull: true,
// }, 
// children_count: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     defaultValue: 0
// }, 
// points : {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     defaultValue: 0
// },
// layer: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
// },
// isActive: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: true
// },
// isStickied: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: false

// }