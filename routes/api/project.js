const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const sposorGuard = require('../../middlewares/sponsorGuard');
const professorGuard = require('../../middlewares/professorGuard');

const Project = require('../../models/Project');
const User = require('../../models/User');

//Validation
const validateProjectInput = require('../../validation/project');

//@route GET api/project/test
//@desc tests post routes
//@access public

router.get('/test', (req, res) => res.json({msg: "posts works"}));

//trying to add post and use role based check if the user.role is sponsor

//@route POST api/project/sponsor/create
//@desc Create Project
//@access Private

router.post('/sponsor/create',passport.authenticate('jwt', {session:false}), sposorGuard, (req, res) => {
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
    Description: req.body.Description,
    user: req.user.id
  });

  newProject.save().then(post => res.json(post));
});


//@route GET api/project/sponsor
//@desc Sponsor can view all its current Proejcts
//@access Private

router.get('/sponsor', passport.authenticate('jwt', {session: false}), sposorGuard, (req, res) => {
    Project.findOne({user: req.user.id})
        .then(project => {
            if(project.user.toString() === req.user.id){
                res.json(project);
            }
        })
});


//@route DELETE api/project/sponsor/:id
//@desc Sponsor can delete the project they don't want 
//@access Private

router.delete('/sponsor/:id', passport.authenticate('jwt',{session:false}), sposorGuard, (req, res) => {
    Project.findOne({user: req.user.id})
        .then(project => {
            //check for project owner
            if(project.user.toString() !== req.user.id){
                return res.status(401).json({notauthorized: 'User not authorized'});
            }

            //Delete
            project.remove().then( () => res.json({success: true}));
        })
        .catch(err => res.status(404).json({postnotfound: 'no post found'}));
});

//@route GET api/project/professor
//@desc Professors can view all current Proejcts posted by all the sponsors
//@access Private

router.get('/professor', passport.authenticate('jwt', {session: false}), professorGuard,(req, res) => {
    Project.find()
        .sort({date: -1})
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json({nopostfound: 'no project found'}))
});








module.exports = router;