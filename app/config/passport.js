const passport = require('passport')
const db = require('../models')
const LocalStrategy = require('passport-local').Strategy

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: 'http://www.example.com/auth/google/callback'
// },
// function(accessToken, refreshToken, profile, done){
//     URLSearchParams.findOrCreate({googleId: profile.id}, function(err, user){
//         return done(err, user)
//     })
// }
// ))

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    }, function(email, password, done){
        db.User.findOne({
            where: {
                email: email
            }
        }).then(function(dbUser){
            if(!dbUser){
                return done(null, false, {
                    message: 'Incorrect password'
                })
            } else if (!dbUser.validPassword(password)){
                return done(null, false, {
                    message: 'Incorrect password'
                })
            }
            return done(null, dbUser)
        })
    }
))

passport.serializeUser(function(user, cb){
    cb(null, user)
})

passport.deserializeUser(function(obj, cb){
    cb(null, obj)
})

module.exports = passport;
