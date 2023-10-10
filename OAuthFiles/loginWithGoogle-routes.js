const express = require('express')
const passport = require('passport')
const router = express.Router()
const successLoginURL = "http://localhost:3000/login";
const errorLoginURL = "http://localhost:3000/login";

router.get("/login/google", passport.authenticate("google", {scope: "email"}))

router.get("/auth/google/callback", passport.authenticate("google", {
    failureMessage: "Cannot login to google.", 
    failureRedirect: errorLoginURL,
    successRedirect: successLoginURL
}), 
(req, res) => {
    console.log("am I getting in here?")
    if (req.user) {
        console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        const token = req.user
       
        console.log("TOKEN: " + token)
      
        res.status(200).json({auth: true, token, user: user})
    } 
    console.log("FUUUUUUUCK")
    res.status(401).json({auth: false, message: "Authentication failed"})
}
)



module.exports = router; 