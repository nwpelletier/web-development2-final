const {Posts} = require("../models");
const {Users} = require("../models");
const {Moderators} = require("../models");
const {Subcruddits} = require("../models");
const validator = require('validator'); 

module.exports = {
    createNew: async (req, res) => {
        newSubcruddit = req.body;
        userId = req.UserId;
        newSubcruddit.UserId = userId;
        if (!newSubcruddit.subcrudditName) {
            return res.status(400).send({message: "You must provide a subcruddit name"});
        }
        if (!validator.isLength(newSubcruddit.subcrudditName, {min: 4, max:20})) {
            return res.status(400).send({message: "Subcruddit name must be between 4 and 20 characters long."});
        }
        if (!validator.isAlphanumeric(newSubcruddit.subcrudditName)) {
            return res.status(400).send({message: "Subcruddit name must contain only letters and numbers."});
        }
        if (!validator.isLowercase(newSubcruddit.subcrudditName)) {
            return res.status(400).send({message: "Subcruddit name must be lower case."});
        }
        if (newSubcruddit.wiki && !validator.isLength(newSubcruddit.wiki, {min: 10, max:10000})) {
            return res.status(400).send({message: "If you choose to create a wiki, it must be between 10 and 10,000 characters long."});
        }
        const subcrudditExists = await Subcruddits.findOne({
            where: {
                subcrudditName: newSubcruddit.subcrudditName
            }
        })
        if (subcrudditExists) {
            console.log(subcrudditExists)
            return res.status(400).send({message: "That name is already taken"})
        }
        const userExists = await Users.findByPk(userId, {
            where: {
                isActive: true
            }
        });
        if (!userExists) {
            return res.status(400).send({message: "You must create a subcruddit from a valid account"});
        }
        try {
            createdSub = await Subcruddits.create(newSubcruddit)
        } catch (error) {
            console.log(error)
            return res.status(500).send({message: "Internal server error"})
        }

        const newMod = {
            SubcrudditId : createdSub.id,
            UserId: newSubcruddit.UserId
        }

        try {
            const newModConfirm = await Moderators.create(newMod);
            return res.status(201).send({moderator: newModConfirm, subcruddit: createdSub})
        } catch (error) {
            console.log(error)
            return res.status(500).send({message: "Internal server error"})
        }
    }, 
    findSubcruddit: async (req, res) => {
    subName = req.params.subcruddit;
    try {
        const subcruddit = await Subcruddits.findOne({
            where: {
                subcrudditName: subName
            }
        })
        if (!subcruddit) {
            return res.status(400).send({message: "That subcruddit does not exist"})
        }
        const moderators = await Moderators.findAll({
            where: {
                SubcrudditId: subcruddit.id
            },  include: [{
                model: Users,
                attributes: ['username', 'id'] 
              }] 
        })
        if (moderators.length === 0) {
            return res.status(400).send({message: "That subcruddit does not have moderation"})
        }
        const moderatorObj = moderators.map((moderator) => ({
            UserId: moderator.UserId, 
            username: moderator.User.username
        }));


        const responseObj = {
            
                id: subcruddit.id,
                subcrudditName: subName,
                wiki: subcruddit.wiki,
            moderators: moderatorObj
        }

        return res.status(200).send({subcruddit: responseObj});
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "Internal server error"})
    }

}, 
    findAll: async (req, res) => {
    try {
        const subcruddits = await Subcruddits.findAll({
            where: {
                isActive: true
            }
        })
        const returnObj = subcruddits.map((subcruddit) => ({
            SubcrudditId: subcruddit.id,
            subcrudditName: subcruddit.subcrudditName
        }));
        return res.status(200).send(returnObj)

    } catch (error) {
        return res.status(500).send({message: "Internal server error"})
    }
}, 
    toggleActive: async (req, res) => {
    try {
        const subId = req.params.id;
        const subToToggle = await Subcruddits.findByPk(subId);
        if (!subToToggle) {
            return res.status(400).send({message: "That subcruddit does not exist"})
        } 
        subs

    } catch (error) {
        return res.status(500).send({message: "Internal server error"})
    }
    subToToggle.isActive = !subToToggle.isActive;
    subToToggle.save()
    .then(()=> {
        res.status(200).send({message: "Success", isActive: subToToggle.isActive}) 
    }).catch((error)=> {
        res.status(500).send({message: "Internal Server Error", error: error}) 
    })
}, 
    editWiki: async (req, res) => {
       const modId = req.UserId
       const wiki = req.body.wiki
       const subId = req.params.id

        try {
            if (!validator.isLength(wiki, {min: 10, max:10000})) {
                return res.status(400).send({message: "Subcruddit wikis must be between 10 and 10,000 characters."})
            }
            modExists = await Moderators.findOne({
                where: {
                    UserId: modId, 
                    SubcrudditId: subId
                }
            })
            if (modExists) {
                return res.status(400).send({message: "You are not authorized to edit this subreddit's wiki"})
            }
            subcruddit = await Subcruddits.findByPk(subId)
            subcruddit.wiki = wiki
            subcruddit.save()
            .then(()=> {
                res.status(200).send({message: "Success", subcruddit: subcruddit}) 
            }).catch((error)=> {
                res.status(500).send({message: "Internal Server Error", error: error}) 
            })
            
        } catch (error) {
            return res.status(500).send({message: "Internal server error"})
        }
    },
    doesExist: async (req, res) => {
        
            subName = req.params.subcruddit;
            
            try {
                const subcruddit = await Subcruddits.findOne({
                    where: {
                        subcrudditName: subName
                    }
                })
                if (!subcruddit) {
                    return res.status(200).send(false)
                } else {
                    return res.status(200).send(true)
                }

             } catch (error) {
                    console.log(error)
                    return res.status(500).send({message: "Internal server error"})
                }

    }

}


