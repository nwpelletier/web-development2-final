const passport = require('passport');
const passportJwt = require('passport-jwt');
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const {Users} = require("../models");

passport.use(
    new StrategyJwt(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        function (jwtPayload, done) {
            console.log(jwtPayload)
            return Users.findOne({ where: { id: jwtPayload.id } })
                .then((user) => {
                    return done(null, user);
                })
                .catch((error) => {
                    return done(error);
                });
        }
    )
);
