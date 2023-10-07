const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"], 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    key: "userId",
    secret: "sessionSecret",
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        expires: 60 * 60 * 24
    }
}))


const db = require('./models')

// routers 
const userRouter = require("./routes/user-routes");
app.use('/users', userRouter);

const articleRouter = require("./routes/article-routes");
app.use('/blogs', articleRouter);

const commentRouter = require("./routes/comments-routes");
app.use('/comments', commentRouter);


db.sequelize.sync().then(() => {
    app.listen(8080, () => {
        console.log("server running on port 8080");
    })
})

// FOR USE IN FRONT END : Axios.defaults.withCredentials = true;
// https://www.youtube.com/watch?v=sTHWNPVNvm8 : 19:00
