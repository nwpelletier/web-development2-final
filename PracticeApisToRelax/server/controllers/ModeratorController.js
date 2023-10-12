const { Moderators } = require("../models");

exports.create = async (req, res) => {
  try {
    const moderator = req.body;
    await Moderators.create(moderator);
    res.json("SUCCESS");
  } catch (error) {
    console.error("Error creating ", error);
    res.status(500).json({ error: "Internal Error" });
  }
};

exports.findById = async (req, res) => {
  try {
    const id = req.params.id;
    const moderator = await Moderators.findByPk(id);

    if (!moderator)
      return res.status(404).json({ error: "Moderator not found" });

    res.json(moderator);
  } catch (error) {
    console.error("Error retrieving moderator ", error);
    res.status(500).json({ error: "Internal Error" });
  }
};


exports.findAll = async (req, res) => {
  const all = await Moderators.findAll();
  res.json(all);
};