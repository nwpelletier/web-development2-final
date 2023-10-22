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
