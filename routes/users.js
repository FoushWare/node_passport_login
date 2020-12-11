const express = require('express');
//Load User Model
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//Middleware so if the user isAuth redirect him to the dashboard and if not got to register/login page
const { forwardAuthenticated } = require('../config/auth');



//Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render("login"));
// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render("register"));

// [Register Handler] POST Request 
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;

    let errors = [];
    // Sanity check
    if (!name || !email || !password || !password2) { errors.push({ msg: 'Please Enter All Fields' }); }
    if (password2 !== password) { errors.push({ msg: 'Password Do not Match' }); }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    // If there are Errrors 
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: "Email already exists" });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                })

                //Encrypt the newUser password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

//Login 
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
})

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;