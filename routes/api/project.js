const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const sposorGuard = require('../../middlewares/sponsorGuard');


const Project = require('../../models/Project');

const validateProjectInput = require('../../validation/project');

//@route GET api/project/test
//@desc tests post routes
//@access public

router.get('/test', (req, res) => res.json({msg: "posts works"}));

//trying to add post and use role based check if the user.role is sponsor

//@route POST api/project
//@desc Create Project
//@access Private

router.post('/',passport.authenticate('jwt', {session:false}), sposorGuard, (req, res) => {
    const {errors, isValid} = validateProjectInput(req.body);
  //validation

  if(!isValid){
    //if is not valid, return 400 with errors
    return res.status(400).json(errors);
  }

  const newProject = new Project({
    email: req.body.email,
    projectName: req.body.projectName,
    phone: req.body.projectName,
    Address: req.body.Address,
    Duration: req.body.Duration,
    Budget: req.body.Budget,
    Size: req.body.Size,
    Description: req.body.Description
  });

  newProject.save().then(post => res.json(post));
});

module.exports = router;