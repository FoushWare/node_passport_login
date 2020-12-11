const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 5050;
//Flash message needs session to show messages after redirect 
const flash = require('connect-flash');
const session = require('express-session');

//Passport config
require('./config/passport')(passport);

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({ extended: false }));


// Express Sessions
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error'); // For passport error 
    next();
});

//DB Config 
const db = require('./config/Keys').MongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("mongoDB connected...")).catch(err => console.log(err));




//   Routes 

// [Welcome Page]
app.use('/', require('./routes/index'));

// User

app.use('/users', require('./routes/users'));


app.listen(PORT, console.log(`Server started on port ${PORT}`));