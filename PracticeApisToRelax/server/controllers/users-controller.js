require('dotenv').config({ path: "../.env" });
const {Users} = require("../models");
const bcrypt = require('bcrypt');
const validator = require('validator');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const saltRounds = parseInt(process.env.PASSWORD_SALT)
const session = require('express-session'); 
const jwt = require('jsonwebtoken');


module.exports = {
    createUser : async (req, res) => {
        const user = req.body; 
        try {
           if (!validateNewUser(user, req, res)) {
            return;
           }
           if (user.email) {
            const emailExists = await Users.findAll({
                where: {
                    email: user.email
                }
            })
            
            if (emailExists.length > 0){
               
                return res.status(400).json({message : "That email is already in use", user: true})
            }
           }
            const userExists = await Users.findAll({
                where: {
                    username: user.username
                }
            })
            
            if (userExists.length > 0){
               
                return res.status(400).json({message : "That username is already in use", user: true})
            }
    
            bcrypt.hash(user.password, saltRounds, async (err, hash) => {
                if (err){
                    console.log(err);
                    return res.status(500).json({message: "Internal Server Error"})
                }
                try {
                    user.password = hash;
                    const createdUser = await Users.create(user);
                    createdUser.password = null;
                    return res.status(201).json(createdUser);
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({message: "Internal Server Error"})
                }
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    
    }, 
    login : async (req, res) => {
            const username = req.body.username;
            const pass = req.body.password;
            try {
                const userFound = await Users.findAll({
                    where: {
                        username: username,
                        isActive: true
                    }
                })
                if (userFound.length > 0  ){
                    bcrypt.compare(pass, userFound[0].password, (error, response) => {
                        if (response){
                            
                            const id = userFound[0].id;
                            const role = userFound[0].role;
                            const token = jwt.sign({id, role}, process.env.JWT_SECRET, {
                                expiresIn: 1200, 
                            })
                            req.session.user = userFound[0];
                            console.log(req.session.user);
                            return res.status(200).json({auth: true, token: token, username: userFound[0].username, id: userFound[0].id, role: userFound[0].role});
                        } else {
                            return res.status(400).json({auth: false, message: "Incorrect username and password combination"})
                        }
                    })
                } else {
                    return res.status(400).json({auth: false, message: "Incorrect username and password combination"})
                }
                
            } catch (error) {
                console.log(error);
                res.status(500).json({auth: false, message: "Internal Server Error"})
            }
        
    },
    findEmail: async(req, res) => {
        const newEmail = req.body; 
        try {
            const userExists = await Users.findAll({
                where: {
                    email: newEmail.email
                }
            })
            if (userExists.length > 0) {
                return res.status(200).json({exists: true})
            } else {
                return res.status(200).json({exists: false})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }, 
    findUsername: async(req, res) => {
        const newUsername = req.body; 
        try {
            const userExists = await Users.findAll({
                where: {
                    username: newUsername.username
                }
            })
            if (userExists.length > 0) {
                return res.status(200).json({exists: true})
            } else {
                return res.status(200).json({exists: false})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }, 
    makeAdmin: async(req, res) => {
        const userId = req.params.id;
        try {
            
            newAdmin = await Users.findOne({
                where: {
                    id: userId,
                    isActive: true
                }
            })
            if (!newAdmin){
                return res.status(400).send({
                    message: "Could not find user."
                });
            }
            newAdmin.role = "admin";
            await newAdmin.save()

            return res.status(200).json({message: "Successfully made user " + newAdmin.username + " an admin", isAdmin: newAdmin.isAdmin})

        } catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    },
    deleteUser: async(req, res)=> {
        const userId = req.params.id;
        // TODO: uncomment when auth is implemented
        try {
            userToDelete = await Users.findOne({
                where: {
                    id: userId,
                    isActive: true
                }
            })
            if (!userToDelete){
                return res.status(400).send({
                    message: "Could not find user."
                });
            }
            // if (req.role === 'user' && req.UserId !== userToDelete.id) {
            //     return res.status(400).send({
            //         message: "You do not have permission to delete this userr."
            //     });
            // }
            userToDelete.isActive = false;
            await userToDelete.save()

            if (userToDelete.isActive) {
                return res.status(400).send({
                    message: "Something occurred while deleting user " + userToDelete.username + "."
                });
            }
            return res.status(200).send({message: "Successfully deleted user " + userToDelete.username + ".", isActive: userToDelete.isActive})

        } catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        } 

    },
    addEmail: async(req, res) => {
        //TODO: uncomment below code once authentication is active
        const userId = req.params.id;
        const user = req.body;
     //   const validUserId = req.UserId
        try {
            userFound = await Users.findOne({
                where: {
                    id: userId,
                    isActive: true
                }
            })
            if (!userFound){
                return res.status(400).send({
                    message: "Could not find user."
                });
            }
            // if (validUserId !== userId){
            //     return res.status(400).send({
            //         message: "You do not have permission to change this account."
            //     });
            // }
            if ((!validator.isEmail(user.email))){
                return res.status(400).send({
                    message: "Must provide valid email address."
                });
            }
            
            userFound.email = user.email;
            await userFound.save()

            if (userFound.email !== user.email) {
                return res.status(400).send({
                    message: "Something occurred while updating " + userFound.username + "'s email."
                });
            }
            return res.status(200).send({message: "Successfully updated user " + userFound.username + "'s email.", email: userFound.email})

        } catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        } 

    },  
    reinstateUser: async(req, res) => {
        try {
            const userId = req.params.id
            userToDelete = await Users.findOne({
                where: {
                    id: userId,
                    isActive: false
                }
            })
            if (!userToDelete){
                return res.status(400).json({message: "Could not find user"})
            }
            userToDelete.isActive = true;
            userToDelete.save()
            if (!userToDelete.isActive){
                return res.status(500).json({message: "Could not reinstate user"})
            }
            userToDelete.password = null;
            userToDelete.id = null;
            return res.status(200).send({message: "Reinstated " + userToDelete.username + ".", user: userToDelete})


        } catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }


    }
    }



function validateNewUser(user, req, res){
  


     if ( !user.password || !user.passwordConfirm || !user.username) {
        res.status(400).send({
            message: "Must provide a valid username, and two matching passwords."
        });
        return false;
     } 

     if (user.password !== user.passwordConfirm) {
        res.status(400).send({
            message: "Passwords must match"
        });
        return false;
     } 
    

    if (user.email) {
        if ((!validator.isEmail(user.email))){
            res.status(400).send({
                message: "Must provide valid email address."
            });
            return false;
        }
    }
  
    if (!validator.isLength(user.password, {min: 6, max:50})) {
        res.status(400).send({
            message: "Password must be between 6 and 50 characters long."
        });
        return false;
    }
 
    return true;

}

// id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   username: {
//     type: DataTypes.STRING(256),
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING(256),
//     allowNull: true,
//     defaultValue: null
//   },
//   password: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//   },
//   role: {
//     type: DataTypes.ENUM('admin', 'user'),
//     allowNull: false,
//     defaultValue: 'user'
//   },
//   isActive: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: true
//   },
// });