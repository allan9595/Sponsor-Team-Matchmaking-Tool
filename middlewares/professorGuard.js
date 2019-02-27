const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');

const keys = require('../config/keys');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();;
opts.secretOrKey = keys.secretOrKey;


const professorGuard = (req, res, next) => {
    if(req.user && (req.user.role !== "professor")){
        next(res.status(403).json({err:" you are not a professor"}));
    } else {
        next();
    }
}

module.exports = professorGuard ;