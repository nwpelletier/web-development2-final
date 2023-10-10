const {Users} = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const validator = require('validator');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const session = require('express-session'); 
const jwt = require('jsonwebtoken');


module.exports = {
    createUser : async (req, res) => {
        const user = req.body; 
        try {
           if (!validateNewUser(user, req, res)) {
            return;
           }
            const emailExists = await Users.findAll({
                where: {
                    email: user.email
                }
            })
            
            if (emailExists.length > 0){
               
                return res.status(400).json({message : "That email is already in use", user: true})
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
                    console.log(error);
                    res.status(500).json({message: "Internal Server Error"})
                }
                try {
                    user.password = hash;
                    const createdUser = await Users.create(user);
                    createdUser.password = null;
                    res.status(201).json(createdUser);
                } catch (error) {
                    console.log(error);
                    res.status(500).json({message: "Internal Server Error"})
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
                        username: username
                    }
                })
                if (userFound.length > 0  ){
                    bcrypt.compare(pass,  userFound[0].password, (error, response) => {
                        if (response){
                            
                            const id = userFound[0].id;
                            const token = jwt.sign({id}, process.env.JWT_SECRET, {
                                expiresIn: 1200, 
                            })
                            req.session.user = userFound[0];
        
                            console.log(req.session.user);
                            return res.status(200).json({auth: true, token: token, email: userFound[0].email, id: userFound[0].id});
                        } else {
                            return res.status(400).json({auth: false, message: "Incorrect username and password combination"})
                        }
                    })
                } else {
                    return res.status(400).json({auth: false, message: "Incorrect username and password combination"})
                }
                
            } catch (error) {
                console.log(error);
                res.status(500).json({message: "Internal Server Error"})
            }
        
        }
}

function validateNewUser(user, req, res){
  
    
    const passwordOptions = {
        returnScore: true, 
        pointsPerRepeat: 0,
        pointsPerUnique: 0,
        pointsForContainingLower: 10, 
        pointsForContainingUpper: 10, 
        pointsForContainingNumber: 5, 
        pointsForContainingSymbol: 5 
      };

     if (user.email === undefined || user.password === undefined || user.passwordConfirm === undefined || user.username) {
        res.status(400).send({
            message: "Must provide valid email address, username, and two matching passwords."
        });
        return false;
     } 

     if (user.password !== user.passwordConfirm) {
        res.status(400).send({
            message: "Passwords must match"
        });
        return false;
     } 
    

    if (!validator.isEmail(user.email)) {
        res.status(400).send({
            message: "Must provide valid email address."
        });
        return false;
    }
  
 
    if (validator.isStrongPassword(user.password, passwordOptions) < 25) {
        res.status(400).send({
            message: "Password must contain at least one uppercase letter, one lower case letter, and one number or special character."
        });
        return false;
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
//     primaryKey: true

// },
// googleId: {
//     type: DataTypes.STRING(2000),
//     allowNull: true

// },
// username: {
//     type: DataTypes.STRING(50),
//     allowNull: false

// },
// password: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
// },
// email: {
//     type: DataTypes.STRING(360),
//     allowNull: true,
//     unique: true

// }