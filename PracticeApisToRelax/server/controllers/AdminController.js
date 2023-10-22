const { Posts } = require("../models");
const { Users } = require("../models");
const { Moderators } = require("../models");
const { Votes } = require("../models");
const { Subcruddits } = require("../models");
const validator = require("validator");

exports.findAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();

    const usersObj = users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    }));
    res.status(200).send(usersObj);
  } catch (error) {
    //console.log("ERROR: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.toggleActive = async (req, res) => {
console.log("ADMIN CONTROLLER BODY",req.params)

  const user = await Users.findByPk(req.params.id);

  if (!user) return res.status(404).send("User Not Found");

  user.isActive = !user.isActive;

  user.save()
    .then(() => {
      return res.status(200).send({id: user.id, isActive: user.isActive});
  })
};
