require("dotenv").config({ path: "../.env" });
const multer = require('multer')
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// imported routes
const postRoutes = require("./routes/post-routes");
const userRoutes = require("./routes/user-routes");
const voteRoutes = require("./routes/vote-routes");
const moderatorRoutes = require("./routes/ModeratorRoutes");
const subcrudditRoutes = require("./routes/subcruddit-routes");

const userpage = require("./routes/PostUserRoutes");

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })



app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "id",
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// routers
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/moderators", moderatorRoutes);
app.use("/api/subcruddits", subcrudditRoutes);
app.use("/api/overview", userpage);

const db = require("./models");

db.sequelize.sync().then(() => {
  app.listen(process.env.DEV_PORT, () => {
    console.log("server running on port " + process.env.DEV_PORT);
  });
});

// upload.single('avatar')