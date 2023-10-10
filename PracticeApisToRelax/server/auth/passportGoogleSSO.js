const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { uniqueNamesGenerator,  adjectives, colors, animals } = require('unique-names-generator');
const jwt = require('jsonwebtoken');



const {Users} = require("../models");

passport.initialize();

passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, cb) => {
    console.log("GOOGLE ID: " + profile.id)
    const userFound = await Users.findOne({
        where: {
            googleId: profile.id
        }
    })

    if (userFound) {
        const foundId = userFound.id;
        const token = jwt.sign({foundId}, process.env.JWT_SECRET, {
            expiresIn: 1200, 
        })
        req.session.user = userFound.username;
        
        const sendUser = {
            username: userFound.username,
            id: userFound.id, 
            token: token
        }
       
        return cb(null, sendUser)

    } else {

        let foundInDb = true;
        let defaultUsername = "";
        while(foundInDb) {
            defaultUsername = randomName()
            const user = await Users.findOne({
                where: {
                    username: defaultUsername
                }
            }).catch((error) => {
                console.log(error)
            })
            if (!user) {
                foundInDb = false;
            }
        }

        const newUser = {
            email: profile.emails[0].value,
            googleId: profile.id,
            username: defaultUsername
        }

        const createUser = await Users.create(newUser);
        const id = createUser.id;

        const token = jwt.sign({id}, process.env.JWT_SECRET, {
            expiresIn: 1200, 
        })
        const sendUser = {
            username: createUser.username,
            id: createUser.id, 
            token: token
        }
        return cb(null, sendUser)
    }

    
}));


// localStorage.setItem('token', yourJWTToken);


// passport.serializeUser(function(user, done) {
//     console.log(user)
//     done(null, user);
//   });
  
//   passport.deserializeUser(function(user, done) {
//     done(null, user);
//   });


// function randomName() {
   
//     const shortName = uniqueNamesGenerator({
//         dictionaries: [adjectives, animals], 
//         length: 2
//       });
//         const randomNumber = Math.floor(Math.random() * 900) + 100;   
//         return shortName + randomNumber;
// }