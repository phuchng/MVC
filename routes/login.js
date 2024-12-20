var express = require('express');
var account = require('../models/Account');
var passport = require('passport');
var router = express.Router();

/* GET users listing. */

router.get('/', async function(req, res, next) {
  res.render('login', { title: 'Login' })
});

router.post('/', async function (req, res, next){ 
  passport.authenticate('local', (err, user, info) => {
  if (err) return next(err);

  if (!user) {
    // Failure: Set flash message explicitly for error_msg
    req.flash('error_msg', info.message); // info.message contains the error from the strategy
    return res.redirect('/login');
  }

  // Success: Log the user in
  req.logIn(user, (err) => {
    if (err) return next(err);

    // Set flash message explicitly for success_msg
    req.flash('success_msg', `Welcome back, ${user.name}!`); // Customize success message
    return res.redirect('/');
  });
})(req, res, next);
});


module.exports = router;