// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/user')

// // Authentication using passport
// passport.use(new LocalStrategy({
//     usernameField: 'email'
//     },
//     function(email, password, done){
//         // find the user and establish the identity
//            User.findOne({email: email}, function(err, user){
//             if(err){
//                 console.log('Error in finding ----> Passprot')
//                 return done(err)
//             }
//             if(!user || user.password != password){
//                 console.log('Invaild User/Password')
//                 return done(null, false);
//             }
//             return done(null, user);


//            });
//     }


// ));

// // serializing the user to decide which key is to be kept in the cookies
// passport.serializeUser(function(user,done){
//     done(null, user.id);
// });
// // deserializing the user from the key in the cookies
// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err,user){
//         if(err){
//             console.log('Error in finding ----> Passprot')
//             return done(err)
//         }
//         return done(null. user);
//     });
// });



const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async function(email, password, done) {
    try {
        const user = await User.findOne({ email: email });

        if (!user || user.password !== password) {
            console.log('Invalid User/Password');
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        console.log('Error in finding ----> Passport', error);
    }
}));

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        return done(null, user);
    } catch (error) {
        console.log('Error in finding ----> Passport', error);
    }
});

// check if the user is authenticated
// passport.checkAuthentication = function(req, req, next){
//     // if the user is signed-in, then passed on to the next function(controler action)
//     if(req.isAuthenticated()){
//         return next();
//     }
//     // if the user is not signed in 
//        res.redirect('/user/sign-in')
// }

// passport.setAuthentication = function(req,res,next){
//     if(req.isAuthenticated){
//         // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the view
//         res.locals.user = req.user;
//     }
// }

passport.checkAuthentication = async function(req, res, next) {
    // if the user is signed-in, then pass on to the next function(controller action)
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not signed in 
    res.redirect('/user/sign-in');
};

passport.setAuthenticatedUser = async function(req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed-in user from the session cookie and we are just sending this to the locals for the view
        res.locals.user = req.user;
    }
    next();
};


module.exports = passport; 