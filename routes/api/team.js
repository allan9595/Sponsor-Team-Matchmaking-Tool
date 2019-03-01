const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const sponsorGuard = require('../../middlewares/sponsorGuard');
const professorGuard = require('../../middlewares/professorGuard');


const Project = require('../../models/Project');
const User = require('../../models/User');

const Team = require('../../models/team');

//@route GET api/team/test
//@desc tests team routes
//@access public

router.get('/test', (req, res) => res.json({msg: "posts works"}));



module.exports = router;