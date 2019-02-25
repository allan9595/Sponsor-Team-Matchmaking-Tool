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

const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');
//@route GET api/users/test
//desc: tests users routes
//@access public

router.get('/test', (req, res) => res.json({msg: "GET success"}));

//route POST api/users/signup
//desc: users can signup in this routes
//@access public

router.post('/signup', (req, res) => {

  const { errors, isValid } = validateSignupInput(req.body);

  //check on validation

  if(!isValid){
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email})
    .then(user => {
      if(user){
        errors.email = 'Email already esists';
        return res.status(400).json(errors);
      } else {


        const avatar = gravatar.url(req.body.email, {
          s: '200', //size
          r: 'pg' , //rating
          d: 'mm', //default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password,
          role: req.body.role
        });

        bcrypt.genSalt(15, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    });
});


//@route POST api/users/login
//@desc Login User / Returning JWT token
//@access public

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation

  if(!isValid){
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find User by Email

  User.findOne({email})
    .then(user => {
      //check for user
      if(!user){
        errors.email = "email or password incorrect";
        return res.status(404).json(errors);
      }

      //check password

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            //User Matched

            const payload = {
              id: user.id,
              name: user.name,
              avatar:user.avatar,
              role: user.role
            }; //create the JWT token

            //sign the token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {expiresIn: 3600},
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );
          } else {
            errors.password = "email or password incorrect";
            return res.status(400).json(errors);
          }
        })
    })
});


//@route GET api/users/current
//@desc return current user for access private pages
//@access private
router.get(
  '/current',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    });
  }
);

module.exports = router;
