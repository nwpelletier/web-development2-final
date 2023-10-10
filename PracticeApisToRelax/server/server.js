require('dotenv').config({ path: "../.env" });
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const session = require('express-session');
const passport = require('passport');
require("./auth/passport")
require("./auth/passportGoogleSSO")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const loginWithGoogleApi = require("./routes/loginWithGoogle-routes")
const postRoutes = require("./routes/post-routes")


app.use(express.json());
app.use(passport.initialize())
//app.use(passport.session())
app.use(cors({
    origin: ["http://localhost:3000"], 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    key: "id",
    secret: process.env.JWT_SECRET,
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        expires: 60 * 60 * 24
    }
}))


// app.use('/api/', loginWithGoogleApi);
app.use("/api/posts", postRoutes)



// routers 


const db = require('./models');


db.sequelize.sync().then(() => {
    app.listen(process.env.DEV_PORT, () => {
        console.log("server running on port " + process.env.DEV_PORT);
    })
})


    // app.listen(process.env.DEV_PORT, () => {
    //     console.log("server running on port 8080");
    // })


