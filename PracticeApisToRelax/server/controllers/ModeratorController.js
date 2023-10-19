const { Moderators, Subcruddits, Users } = require("../models");

exports.create = async (req, res) => {
  try {
    const userId = req.UserId;
   
    const subId = req.body.SubcrudditId;
    const mod = await Moderators.findOne({
      where: {
        UserId: userId,
        SubcrudditId: subId
      }
    })

    if (!mod) {
      return res.status(400).send({message: "You do not have moderator access to this subcruddit. "})
    }

    const moderator = req.body;
    await Moderators.create(moderator);
    res.status(201).send({message: "success", moderator});
  } catch (error) {
    console.error("Error creating ", error);
    res.status(500).json({ error: "Internal Error" });
  }
};

exports.findById = async (req, res) => {
  try {
    const id = req.params.id;
    const moderator = await Moderators.findByPk(id, {
      include:  [{
        model: Users,
        attributes: ['username'] 
      }, {
      model: Subcruddits,
      attributes: ['subcrudditName']
    }] 
    });

    if (!moderator)
      return res.status(404).json({ error: "Moderator not found" });

    res.json(moderator);
  } catch (error) {
    console.error("Error retrieving moderator ", error);
    res.status(500).json({ error: "Internal Error" });
  }
};


exports.findAll = async (req, res) => {
  try {
    const all = await Moderators.findAll({
      include:  [{
        model: Users,
        attributes: ['username'] 
      }, {
      model: Subcruddits,
      attributes: ['subcrudditName']
    }] 
    });

    return res.status(200).send({all})
  } 
    catch (error) {
      console.error("Error retrieving moderator ", error);
      res.status(500).json({ error: "Internal Error" });
    }
  }
  

exports.isModerator = async (req, res) => {
  const userId = req.UserId;
  const subName = req.params.subcruddit
  try {
    const subcruddit = await Subcruddits.findOne({
      where: {
        subcrudditName: subName
      }
    })

    if(!subcruddit) {
      return res.status(400).message({message: "that subcruddit does not exist"})
    }

    const mod = await Moderators.findOne({
      where: {
        UserId: userId,
        SubcrudditId: subcruddit.id
      }
    })

    if (!mod) {
      return res.status(200).send(false)
    } else {
      return res.status(200).send(true)
    }



  } catch {

  }
}
  
