require('dotenv').config({ path: "../.env" });
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const session = require('express-session');


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// imported routes
const postRoutes = require("./routes/post-routes")
const userRoutes = require("./routes/user-routes")
const voteRoutes = require("./routes/vote-routes")
const moderatorRoutes = require("./routes/ModeratorRoutes")
const subcrudditRoutes = require("./routes/subcruddit-routes")


app.use(express.json());
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



// routers 
app.use("/api/posts", postRoutes)
app.use("/api/users", userRoutes)
app.use("/api/votes", voteRoutes)
app.use("/api/moderators", moderatorRoutes)
app.use("/api/subcruddits", subcrudditRoutes)


const db = require('./models');


db.sequelize.sync().then(() => {
    app.listen(process.env.DEV_PORT, () => {
        console.log("server running on port " + process.env.DEV_PORT);
    })
})





