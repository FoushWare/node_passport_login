// Build the Stragegy we use for login [local stratage (email,password)] other is token , oAuth,oAuth2,...

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User Model 
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //Match user 
            User.findOne({ email: email }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered' });
                }

                //Match password 
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect' });

                    }
                })
            })
        })
    );


    //Serialize the user to the session by unique identifier [userId ]
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // Get the user by id if exists 
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


}
