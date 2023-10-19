const jwt = require("jsonwebtoken")


module.exports = {
    authUser: async (req, res, next) => {
        const token = req.headers["x-access-token"];
        if (!token) {
            res.send({auth: false});
        } else {
            const jwtSecret = process.env.JWT_SECRET;
            jwt.verify(token, jwtSecret, (err, decoded) => {
                if (err) {
                    console.log(err);
                    res.json({auth: false, message: "failed to authenticate", error: err})
                } else {
                    console.log("this worked - server")
                    req.UserId = decoded.id;
                    req.role = decoded.role;
                    req.username = decoded.username;
                    next();
                }
            })
        }
    },
    authAdmin: async (req, res, next) => {
        const token = req.headers["x-access-token"];
        if (!token) {
            res.send({auth: false});
        } else {
            const jwtSecret = process.env.JWT_SECRET;
            jwt.verify(token, jwtSecret, (err, decoded) => {
                if (err) {
                    console.log(err);
                    res.json({auth: false, message: "failed to authenticate", error: err})
                } else {
                    console.log("this worked - server")
                    req.UserId = decoded.id;
                    req.role = decoded.role;
                    req.username = decoded.username;
                    if (req.role !== "admin") {
                        return res.json({auth: false, message: "failed to authenticate"})
                    }
                    next();
                }
            })
        }
    }


}