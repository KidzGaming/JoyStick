const express = require('express');
const router = express.Router();
var today = new Date();

// Bring in Article Model
let Article = require('../models/article');

// Bring in User Model
let User = require('../models/user');

// Add Route
router.get('/publish', ensureAuthenticated, function(req, res){
  res.render('publish', {
    title:'Publish an Article'
  });
});

// Add Submit POST Route
router.post('/publish', function(req, res){
  req.checkBody('title','Please give the article a title.').notEmpty();
  // req.checkBody('author','Author is required').notEmpty();
  req.checkBody('content', 'Please write some text in the content field.').notEmpty();
  req.checkBody('excerpt', 'Please write an excerpt for this article').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('publish', {
      title:'Publish an Article',
      errors:errors
    });
  } else {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.user._id;
    article.date = today.getDate() + ' ' + (today.getMonth()+1) + ' ' + today.getFullYear();
    article.content = req.body.content;
    article.excerpt = req.body.excerpt;

    article.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success','Article Added!');
        res.redirect('/');
      }
    });
  }
});

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
  Article.findById(req.params.id, function(err, article){
    if(article.author != req.user._id){
      req.flash('danger', 'You are not authorized to edit this article.');
      res.redirect('/');
    }
    res.render('edit_article', {
      title:'Edit Article',
      article:article
    });
  });
});

// Update Submit POST Route
router.post('/edit/:id', function(req, res){
  let article = {};
  article.title = req.body.title;
  article.content = req.body.content;
  article.excerpt = req.body.excerpt;

  let query = {_id:req.params.id}

  Article.update(query, article, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Article Updated!');
      res.redirect('/');
    }
  });
});

// Delete Article
router.delete('/:id', function(req, res){
  if(!req.user._id){
    res.status(500).send();
  }
  let query = {_id:req.params.id}

  Article.findById(req.params.id, function(err, article){
    if(article.author != req.user._id){
      res.status(500).send();
    } else {
      Article.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send('Success!');
      });
    }
  });
});

// Get Single Article
router.get('/:id', function(req, res){
  Article.findById(req.params.id, function(err, article){
    User.findById(article.author, function(err, user){
      res.render('article', {
        article:article,
        author: user.fullname
      });
    });
  });
});

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please create an account or log in');
    res.redirect('/users/login');
  }
}

module.exports = router;