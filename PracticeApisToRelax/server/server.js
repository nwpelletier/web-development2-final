require('dotenv').config({ path: "../.env" });
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()


app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"], 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))





// routers 

const db = require('./models')

db.sequelize.sync().then(() => {
    app.listen(8080, () => {
        console.log("server running on port 8080");
    })
})


    // app.listen(process.env.DEV_PORT, () => {
    //     console.log("server running on port 8080");
    // })


