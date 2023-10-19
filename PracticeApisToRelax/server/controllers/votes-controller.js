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
        const userId = req.UserId
        vote.UserId = userId
    
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
                if (voteExists.liked === vote.liked) {
                    if (vote.liked) {
                        points = -1
                    } else {
                        points = 1;
                    }
                    post.points += points;
                    await post.save()
                    await Votes.destroy({
                        where: {
                            UserId: userId,
                            PostId: postId
                        }
                    })
                    return res.status(200).send({vote: "nothing", points: points});

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
                res.status(200).json({ vote: vote.liked, points: points });
            } catch (error) {
                return res.status(500).json({ message: "Could not complete voting", error: error });
            }
    
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    
    deleteVote: async (req, res) => {
        const postId = req.params.id
        const userId = req.UserId
       
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
    }, 

    getVote: async (req, res) => {
        const post = req.params.commentid;
        const userId = req.params.userid
        try {
            const vote = await Votes.findOne({
                where: {
                    PostId: post,
                    UserId: userId
                }
            })
            if (!vote) {
                return res.status(200).send("nothing");
            } 

            return res.status(200).send(vote.liked)

        } catch (error) {
            console.log(error)
            res.status(500).send({message: "Internal server error"})
        }

    }



}