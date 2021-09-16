const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");

const pool = require("../database");
const helpers = require("../lib/helpers");
const { authenticate } = require("passport");

const multer = require("multer");
const { v4: uuidv4} = require('uuid');

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads"),
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
  },
});

router.get("/signin", isNotLoggedIn, async (req, res) => {
  res.render("auth/signin");
});

router.post("/signin", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/links",
    failureRedirect: "/signin",
    failureFlash: true,
  })(req, res, next);
});

router.get("/signup", isNotLoggedIn, async (req, res) => {
  res.render("auth/signup");
});

const uploadPhoto = multer({
  storage,
  dest: path.join(__dirname, "public/uploads"),
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: File type is not valid. Try to upload jpeg, jpg, png, gif");
  },
}).single("txtPhoto");

router.post(
  "/signup",
  isNotLoggedIn,
  uploadPhoto,
  passport.authenticate("local.signup", {
    successRedirect: "/welcome",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

// router.post('/signup', uploadPhoto, (req, res) => {
//     console.log(req.file);
//     res.send('uploaded');
// });

router.get("/welcome", isLoggedIn, async (req, res) => {
  res.render("welcome");
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/signin");
});

router.get("/forgot_user-email", isNotLoggedIn, async (req, res) => {
  res.render("forgot_user");
});

router.post("/forgot_user-email", async (req, res) => {
  // console.log(req.body);
  let { email } = req.body;
  const row = await pool.query("SELECT username FROM users WHERE email = ?", [
    email,
  ]);
  num_rows = row.length;
  if (num_rows > 0) {
      res.render("auth/signin", { username: row[0] });
  } else {
      res.render("auth/signin", { messageSwal: 'Email is not registered in the Database' });
      // req.flash("message", "Email is not registered in the Database");
      // res.redirect("/forgot_user-email");
  }
});

router.post("/reset_pass", async (req, res) => {
  let { username, password } = req.body;
  // console.log(req.body);
  password = await helpers.encryptPassword(password);
  const sqlStr = "UPDATE users SET password = '" + password + "' WHERE username = '" + username + "'";
  const row = await pool.query(sqlStr);
  const num_rows_affected = row.affectedRows;
  if (num_rows_affected > 0) {
    req.flash("message", "Your password has been changed suscceffully.");
    res.redirect("/signin");
  } else {
    req.flash("message", "Username is not registered in the Database");
    res.redirect("/signin");
  }
});
  



module.exports = router;
