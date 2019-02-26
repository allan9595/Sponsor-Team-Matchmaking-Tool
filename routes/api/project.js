const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');



const Project = require('../../models/Project');

const validateProjectInput = require('../../validation/project');

//@route GET api/project/test
//@desc tests post routes
//@access public

router.get('/test', (req, res) => res.json({msg: "posts works"}));


module.exports = router;