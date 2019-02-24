const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router(); //ask for using router

const keys = require('../../config/keys');
//Load User model
const User = require('../../models/User');

//Load Input Validation

const validateRegisterInput = require('../../validation/signup');

//@route GET api/users/test
//desc: tests users routes
//@access public

router.get('/test', (req, res) => res.json({msg: "GET success"}));

//route POST api/users/signup
//desc: users can signup in this routes
//@access public

router.post('/signup', (req, res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if(user){
        errors.email = 'Email already esists';
        
      }
    })
});

module.exports = router;
