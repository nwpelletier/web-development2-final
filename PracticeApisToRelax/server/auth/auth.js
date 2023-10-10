const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
        const token = req.headers["x-access-token"];
        if (!token) {
            res.send({auth: false});
        } else {
            jwt.verify(token, "jwtSecret", (err, decoded) => {
                if (err) {
                    console.log(err);
                    res.json({auth: false, message: "failed to authenticate", error: err})
                } else {
                    console.log("this worked - server")
                    req.userId = decoded.id;
                    next();
                }
            })
        }
    }
