const {Posts} = require("../models");
const {Users} = require("../models");
const {Moderators} = require("../models");
const {Votes} = require("../models");
const {Subcruddits} = require("../models");
const validator = require('validator');

exports.findAllActivePostsCommentsByUser = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(400).send({ message: "That user does not exist." })
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
      active: post.isActive,
      lock:post.isLocked,
    }));
    res.status(200).send(returnObj);

  } catch (error) {
    console.log("ERROR: ", error);
    res.status(500).json({ message: "Internal Server Error" })
  }
};