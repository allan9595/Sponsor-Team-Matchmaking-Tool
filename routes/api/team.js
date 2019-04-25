const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const sponsorGuard = require('../../middlewares/sponsorGuard');
const professorGuard = require('../../middlewares/professorGuard');


const Project = require('../../models/Project');
const User = require('../../models/User');

const Team = require('../../models/Team');

//@route GET api/team/test
//@desc tests team routes
//@access public

router.get('/test', (req, res) => res.json({msg: "posts works"}));


//@route POST api/project/sponsor/create
//@desc Create Project
//@access Private

router.post('/professor/teams/create',passport.authenticate('jwt', {session:false}) ,professorGuard, (req, res) => {
    

    const teamFields = new Team({
        team: req.body.team,
        projectName: req.body.projectName,
        user: req.user.id
    });
    
      teamFields
        .save()
        .then(team => res.json(team))
        //.catch(err => res.status(400).json({'team':'failed'}));
   
   
});

router.get('/professor/teams', passport.authenticate('jwt', {session: false}), professorGuard,(req, res) => {
  Team.find()
      .sort({date: -1})
      .then(teams => res.json(teams))
      .catch(err => res.status(400).json({noteamsfound: 'no team found'}))
});

module.exports = router;