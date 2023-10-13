const {Posts} = require("../models");
const {Users} = require("../models");
const {Votes} = require("../models");
const validator = require('validator');
module.exports = {
    // TODO: add transactions
    // TODO: modify commented when auth is included
    // TODO: get upvotes/downvotes by user 
    addVote: async (req, res) => {
        const vote = req.body;
        const postId = req.params.id;
        const userId = vote.UserId;
        // const userId = req.UserId
    
        try {
            if (vote.liked === undefined) {
                return res.status(400).json({ message: "Vote cannot be null" });
            }
    
            let points = 0;
            const post = await Posts.findOne({
                where: {
                    id: postId
                }
            });
    
            if (!post) {
                return res.status(404).json({ message: "That post does not exist" });
            }
    
            const voteExists = await Votes.findOne({
                where: {
                    UserId: userId,
                    PostId: postId
                }
            });
    
            if (voteExists) {
                console.log("hello?");
                if (voteExists.liked === vote.liked) {
                    return res.status(400).json({ message: "Cannot vote the same way more than once" });
                }
    
                if (vote.liked) {
                    points = 2;
                } else {
                    points = -2;
                }
                voteExists.liked = vote.liked;
    
                try {
                    await voteExists.save();
                } catch (error) {
                    return res.status(500).json({ message: "Could not complete voting", error: error });
                }
            } else {
                if (vote.liked) {
                    points = 1;
                } else {
                    points = -1;
                }
                vote.UserId = userId;
                vote.PostId = postId;
    
                try {
                    await Votes.create(vote);
                } catch (error) {
                    return res.status(500).json({ message: "Could not complete voting", error: error });
                }
            }
    
            post.points += points;
    
            try {
                await post.save();
                res.status(200).json({ message: "Successfully voted", post: post });
            } catch (error) {
                return res.status(500).json({ message: "Could not complete voting", error: error });
            }
    
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    
    deleteVote: async (req, res) => {
        const userId = req.body.UserId
        const postId = req.params.id
       // const userId = req.UserId
       
        try {
            let points = 0;
            const post = await Posts.findOne({
                where: {
                    id: postId
                }
            })
            if (!post){
                res.status(404).json({message: "That post does not exist"})
            }
            const voteExists = await Votes.findOne({
                where: {
                    UserId: userId,
                    PostId: postId
                }
            })
            if (!voteExists){
                return res.status(400).json({message: "Cannot find that vote"})
            } 
            if (voteExists.liked){
                points = -1
            } else {
                points = 1
            }
            post.points += points;
            post.save()
            .then(()=> {
                Votes.destroy({
                    where: {
                        UserId: userId,
                        PostId: postId
                    }
                })
                .then(()=> {
                    return res.status(200).send({message: "you have successfully deleted your vote", isDeleted: true})
                }).catch((error)=> {
                    return res.status(500).send({message: "Could not complete delete", error: error})
                })
            }).catch((error)=> {
                return res.status(500).send({message: "Could not complete voting", error: error})
            })
        } catch(error) {
            console.log(error);
           return res.status(500).json({message: "Internal Server Error"}) 
        }
    }

}