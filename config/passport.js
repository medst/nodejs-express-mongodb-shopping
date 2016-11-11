var passport = require('passport');
var User = require('../models/user');
var localStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    if(req.body.password != req.body.repassword)
        return done(null, false, {message: 'password is not match !'});
    if(req.body.password.length < 6)
        return done(null, false, {message: 'password it must be contain 6 shift or more !'});
    User.findOne({'email': email}, function(err, user){
        if(err)
          return done(err);
        if(user)
          return done(null, false, {message: 'Email Alerdy in Use !'});
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, res){
            if(err)
              return done(err);
            return done(null, newUser);
        });
    });
}));

passport.use('local.signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    if(req.body.password.length < 6)
        return done(null, false, {message: 'password it must be contain 6 shift or more !'});
    User.findOne({'email': email}, function(err, user){
        if(err)
          return done(err);
        if(!user)
          return done(null, false, {message: 'No User Found !'});
        if(!user.validPassword(password))
          return done(null, false, {message: 'Wrong Password !'});
        return done(null, user);
    });
}));