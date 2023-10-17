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