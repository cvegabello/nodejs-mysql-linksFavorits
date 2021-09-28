const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');
const passport = require('passport');
const multer = require('multer');


// const storage = multer.diskStorage({
//   destination: path.join(__dirname, 'public/uploads'),
//   filename: (req,file,cb) => {
//     cb(null, file.originalname);
//   }
// })

// Initializations

const app = express();
require('./lib/passport');


// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

// Middlewares

// app.use(multer({
//   storage,
//   dest: path.join(__dirname, 'public/uploads'),
//   limits: {fileSize: 1000000},
//   fileFilter: (req, file, cb) => {
//       const filetypes = /jpeg|jpg|png|gif/;
//       const mimetype = filetypes.test(file.mimetype);
//       const extname = filetypes.test(path.extname(file.originalname));
//       if (mimetype && extname){
//           return cb(null, true);
//       }
//       cb("Error: File type is not valid. Try to upload jpeg, jpg, png, gif");
//   }
//   }).single('image_profile'));


app.use(session({
  secret: 'vegamysqlnodemysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
// app.use(Swal());




// Global Variables
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
  });

// Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));
// app.use('/forgot', require('./routes/forgot'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(' Server listening at ', app.get('port'))
});
