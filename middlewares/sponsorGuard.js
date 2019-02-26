const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');

const keys = require('../config/keys');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();;
opts.secretOrKey = keys.secretOrKey;


const sponsorGuard = (req, res, next) => {
    if(req.user && !req.user.role === "sponsor"){
        next(res.status(403).json({err:" you are not a sponsor"}));
    } else {
        next();
    }
}

module.exports = sponsorGuard ;