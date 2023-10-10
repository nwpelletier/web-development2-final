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
            const user = await Users.findAll({
                where: {
                    id: post.UserId
                }
            })
            if (user.length < 1){
                return res.status(400).json({message : "Create post from valid user account", user: false})
            }
            // const subcruddit = await Subcruddits.findAll({
            //     where: {
            //         name: post.subcrudditName
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
        const postId = req.params
        try {

        } catch(error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})  
        }
    }

}

function validatePost(post, req, res) {
    if (post.UserId == undefined || post.SubcrudditId == undefined || post.title == undefined || post.type == undefined || post.content == undefined) {
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
    if (post.type === "image" && (post.caption == undefined || post.mimetype == undefined)) {
                res.status(400).send({
            message: "For images, you must provide a capition and a mimetype."
        });
        return false;
    }
    if (post.type === "image" && !validator.isLength(post.caption, {min: 10, max:200})) {
                res.status(400).send({
            message: "Your image caption must be between 10 and 200 characters long."
        });
        return false;
    }
    if (post.type === "text" && (post.caption !== undefined || post.mimetype !== undefined)) {
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
    if (post.type !== "image" && post.type !== "text"){
                res.status(400).send({
            message: "Post type must be an image or text."
        });
        return false;
    }
    if (post.type == "text" && !validator.isLength(post.content, {min: 10, max:50000})) {
        res.status(400).send({
            message: "Post content must be between 10 and 50 000 characters ."
        });
        return false;
    }

    return true;

}

function validateComment(comment, postId, req, res) {
    if (!postId || !comment.UserId || !comment.SubcrudditId || !comment.type || !comment.content) {
        res.status(400).send({
            message: "You must send user id, subcruddit id, a post type, and post content ."
        });
        return false;
    }
    if (post.type !== "text"){
        res.status(400).send({
            message: "The only valid type for commenting is a text."
        });
        return false;
    }
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