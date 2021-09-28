const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');
// const multer = require('multer');



passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE username = ? ', [username]);
  if (rows.length >0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password,user.password);
    if (validPassword) {
      done(null, user, req.flash('success', 'Welcome ' + user.fullname));

      // setTimeout(() => {
      //   document.getElementById('forgotUsernameId__mensaje').classList.remove('formulario__mensaje-activo');
      // }, 5000);



      
    }
    else {
      done(null, false, req.flash('message', 'Login failed'));
    }
  }
  else {
    return done(null, false, req.flash('message', 'Username does not exists'));
  }
}));


passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  // console.log(req.file);
  const rows = await pool.query('SELECT * FROM users WHERE username = ? ', [username]);
  if (rows.length >0) {
    done(null, false, req.flash('message', `Username ${username} already exists. Please try another. `));
  }
  else {
    const { fullname, txtPhotoHide, email } = req.body;
    
    const rows = await pool.query('SELECT * FROM users WHERE email = ? ', [email]);
    if (rows.length >0) {
      done(null, false, req.flash('message', `Email ${email} already exists. Please try another. `));
    }
    else {
      let profile_image = '';
      try {
        profile_image = req.file.filename;
      }
      catch(err) {
        console.log(profile_image + '=====' + err);
        profile_image = txtPhotoHide;
      }
      finally {
        let newUser = {
          profile_image,
          fullname,
          username,
          password,
          email
        };
        newUser.password = await helpers.encryptPassword(password);
        // Saving in the Database
        const result = await pool.query('INSERT INTO users SET ? ', newUser);
        newUser.id = result.insertId;
        return done(null, newUser);
      }
    }

  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});