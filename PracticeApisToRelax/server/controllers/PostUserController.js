const { Moderators } = require("../models");

exports.findOne = async (req, res) => {
  try {
    //const userId = req.UserId;
    const userId = req.body.modId
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

