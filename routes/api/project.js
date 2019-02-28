const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const sponsorGuard = require('../../middlewares/sponsorGuard');
const professorGuard = require('../../middlewares/professorGuard');

const Project = require('../../models/Project');
const User = require('../../models/User');

//Validation
const validateProjectInput = require('../../validation/project');

//@route GET api/project/test
//@desc tests post routes
//@access public

router.get('/test', (req, res) => res.json({msg: "posts works"}));


//@route GET api/project/sponsor
//@desc Sponsor can view all its current Proejcts
//@access Private

router.get('/sponsor', passport.authenticate('jwt', {session: false}), sponsorGuard, (req, res) => {
    Project.find({user: req.user.id})
        .then(project => {

                res.json(project);   
                  
        })
        .catch(err => res.status(404).json({postnotfound: 'no project found'}));
});

//@route GET api/project/sponsor/:id
//@desc GET post/:id
//@access private

router.get('/sponsor/:id', passport.authenticate('jwt', {session:false}), sponsorGuard,(req, res) => {
    Project.findById(req.params.id)
      .then(project => res.json(project))
      .catch(err => res.status(400).json({noprojectfound: 'No project find'}))
  });

//@route POST api/project/sponsor/create
//@desc Create Project
//@access Private

router.post('/sponsor/create',passport.authenticate('jwt', {session:false}), sponsorGuard, (req, res) => {
    const {errors, isValid} = validateProjectInput(req.body);
  //validation

  if(!isValid){
    //if is not valid, return 400 with errors
    return res.status(400).json(errors);
  }

    //get the project fields first if the project already exists
    
    const projectFields = new Project({
        email: req.body.email,
        projectName: req.body.projectName,
        phone: req.body.phone,
        address: req.body.address,
        duration: req.body.duration,
        budget: req.body.budget,
        size: req.body.size,
        description: req.body.description,
        user: req.user.id,
        status: req.body.status

    });
    
  
    projectFields
        .save()
        .then(project => res.json(project))
        .catch(err => res.status(400).json({'project':'failed'}));
        
  
});

//@route POST api/project/sponsor/update/:id
//@desc Edit Project
//@access Private

router.post('/sponsor/update/:id',passport.authenticate('jwt', {session:false}), sponsorGuard, (req, res) => {
    const {errors, isValid} = validateProjectInput(req.body);
  //validation

  if(!isValid){
    //if is not valid, return 400 with errors
    return res.status(400).json(errors);
  }

    //get the project fields first if the project already exists
    
    const projectFields = {
        email: req.body.email,
        projectName: req.body.projectName,
        phone: req.body.phone,
        address: req.body.address,
        duration: req.body.duration,
        budget: req.body.budget,
        size: req.body.size,
        description: req.body.description,
        user: req.user.id,
        status: req.body.status

    };
    projectFields.user = req.user.id;
    if(req.body.email) projectFields.email = req.body.email;
    if(req.body.projectName) projectFields.projectName = req.body.projectName;
    if(req.body.phone) projectFields.phone = req.body.phone;
    if(req.body.address) projectFields.address = req.body.address;
    if(req.body.duration) projectFields.duration = req.body.duration;
    if(req.body.budget) projectFields.budget = req.body.budget;
    if(req.body.size) projectFields.size = req.body.size;
    if(req.body.description) projectFields.description= req.body.description;
    if(req.body.status) projectFields.status = req.body.status;

  
  Project.findById(req.params.id)
    .then(project => {
        //if project exist, then update
        if(project){
            Project.findByIdAndUpdate(
                req.params.id,
                { $set: projectFields },
                { new: true }
            )
            .then(project => res.json(project))
            .catch(err => res.status(400).json({project: 'Faile Create'}));
        } 
    });
});





//@route DELETE api/project/sponsor/:id
//@desc Sponsor can delete the project they don't want 
//@access Private

router.delete('/sponsor/:id', passport.authenticate('jwt',{session:false}), sponsorGuard, (req, res) => {
    Project.findOne({user: req.user.id})
        .then(project => {
            //check for project owner
            if(project.user.toString() !== req.user.id){
                return res.status(401).json({notauthorized: 'User not authorized'});
            }

            //Delete
            project.remove().then( () => res.json({success: true}));
        })
        .catch(err => res.status(404).json({projectnotfound: 'no project found'}));
});

//@route GET api/project/professor
//@desc Professors can view all current Proejcts posted by all the sponsors
//@access Private

router.get('/professor', passport.authenticate('jwt', {session: false}), professorGuard,(req, res) => {
    Project.find()
        .sort({date: -1})
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json({noprojectfound: 'no project found'}))
});

//@route GET api/project/professor/:id
//@desc GET api/project/professor/:id
//@access private

router.get('/professor/:id', passport.authenticate('jwt', {session:false}), professorGuard,(req, res) => {
    Project.findById(req.params.id)
      .then(project => res.json(project))
      .catch(err => res.status(400).json({noprojectfound: 'No project find'}))
  });






module.exports = router;