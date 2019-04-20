const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const path = require('path');
const router = express.Router(); //ask for using router
const async = require('async');
const _ = require('lodash');
const crypto = require('crypto');

const keys = require('../../config/keys');
//Load User model
const User = require('../../models/User');
const Admin = require('../../models/Admin');
const Project = require('../../models/Project');
//Load Input Validation

const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');
const validateResetInput = require('../../validation/reset');

const {sendEmail} = require('../../services/Mailer');


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

        bcrypt.genSalt(11, (err, salt) => {
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


//route POST api/users/signup-admin
//desc: admin signup
//@access public

router.post('/signup-admin', (req, res) => {

  const { errors, isValid } = validateSignupInput(req.body);

  //check on validation

  if(!isValid){
    return res.status(400).json(errors);
  }

  Admin.findOne({role: req.body.role})
    .then(user => {
      if(user){
        errors.email = 'There is a Admin account already, action forbideen!';
        return res.status(400).json(errors);
      } else {


        const avatar = gravatar.url(req.body.email, {
          s: '200', //size
          r: 'pg' , //rating
          d: 'mm', //default
        });

        const newUser = new Admin({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password,
          role: req.body.role
        });

        bcrypt.genSalt(11, (err, salt) => {
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

//@route GET api/users/admin
//@desc get all the user accounts in the system
//@access private

router.get('/admin', (req, res) => {
  User.find()
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(404).json({usernotfound: 'no user found'}));
})

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

//@route POST api/users/login
//@desc Login User / Returning JWT token
//@access public

router.post('/login-admin', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation

  if(!isValid){
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find User by Email

  Admin.findOne({email})
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

//@route GET api/users/admin/:id
//@access private

router.get('/admin/:id',  (req, res) => {
 
   User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(400).json({nouserfound: 'No user find'}))
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


router.post('/forgot',  async (req, res) => {

  token = await crypto.randomBytes(20).toString('hex');  
  
  try{
    
    User.findOne({email: req.body.email}, (err, user) => {
      
      if(!user) {
        return res.redirect(`${keys.redirectDomain}/login`);
      }

      user.reset_password_token = token;
      user.reset_password_expires = Date.now() + 3600000; // 1 hour
      user.save();
      sendEmail(user.email, token);
      res.status(201).json({user, token});
    })
  } catch (e) {
   res.status(400).send(e);
  }
});


router.post('/reset/:token', async (req, res) => {

  const { errors, isValid } = validateResetInput(req.body);

  //check on validation

  if(!isValid){
    return res.status(400).json(errors);
  }

  try{
  User.findOne({reset_password_token: req.params.token, reset_password_expires: {$gt: Date.now()}}, (err, user) => {
    if(!user) {
      res.send('No user found or token expired');
    }
    //user.password = req.body.password;
    bcrypt.genSalt(11, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if(err) throw err;
        user.password = hash;
        user.save()
          .catch(err => console.log(err));
      })
    })
    user.reset_password_token = undefined;
    user.reset_password_expires = undefined;
    user.save();
    res.status(201).json({user});
  })
} catch (e) {
  res.status(400).send(e);
}
  
});
module.exports = router;
