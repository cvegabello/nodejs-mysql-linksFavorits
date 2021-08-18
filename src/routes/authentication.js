const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../database');
const helpers = require('../lib/helpers');
const { authenticate } = require('passport');


router.get('/signin', async (req, res) => {
    res.render('auth/signin');
});


router.post('/signin', async (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/links',
        failureRedirect: '/signin',
        failureFlash:true
    })(req, res, next);
});
    



router.get('/signup', async (req, res) => {
    res.render('auth/signup');
});



router.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/welcome',
        failureRedirect: '/signup',
        failureFlash:true
    }));


router.get('/welcome', async (req, res) => {
    res.render('welcome');
});

    

module.exports = router;