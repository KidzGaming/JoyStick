const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

// Bring in User Model
let User = require('../models/user');

// Registration Form
router.get('/register', function(req, res){
  res.render('register');
});

// Register Process
router.post('/register', function(req, res){
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const fullname = req.body.firstname + ' ' + req.body.lastname;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  req.checkBody('firstname', 'Your first name is required').notEmpty();
  req.checkBody('lastname', 'Your last name is required').notEmpty();
  req.checkBody('email', 'Your e-mail address is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Please create a username').notEmpty();
  req.checkBody('password', 'Please create a password').notEmpty();
  req.checkBody('confirmpassword', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors:errors
    });
  } else {
    let newUser = new User({
      firstname:firstname,
      lastname:lastname,
      fullname:fullname,
      email:email,
      username:username,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success','You are now registered and can log in');
            res.redirect('/users/login');
          }
        });
      });
    });
  }
});

// Login Form
router.get('/login', function(req, res){
  res.render('login');
});

// Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;