const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../database');
const helpers = require('../lib/helpers');
const { authenticate } = require('passport');

router.get('/signup', async (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', async (req, res) => {
    passport,authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash:true
    });
    res.send('received');
});

router.get('/profile', async (req, res) => {
    res.send('This is your profile');
});

    
//     let { fullname, username, password } = req.body;
//     const newUser = {
//         fullname,
//         username,
//         password
//     };
//     newUser.password = await helpers.encryptPassword(password);
//     const result = await pool.query('INSERT INTO users set ?', [newUser]);
//     console.log(result);
//   req.flash('success', 'Use successfully');
//   res.redirect('/links');
    
// });

module.exports = router;