const User = require('../models/user')
module.exports.profile = function(req,res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
    // res.end('<h1> User profile </h1>')
}
// render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    };


    return res.render('user_sign-up', { 
        title: 'Codeial | Sign Up'
})
} 
// reder the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    };


    return res.render('user_sign-in',{
        title: 'Codeial | Sign In'
    })
}

// Get data for sign up page 
module.exports.create = async function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back')
    }
        let user = await User.findOne({email: req.body.email})
        // if(err){console.log('error in finding user in sign up!');return}
        
        if(!user){
           let user = await User.create(req.body)
            return res.redirect('/user/sign-in')
                // if(err){console.log('error in creating user while sign up!');return}
            }
            else{   
                return res.redirect('back')
            }
}



// Sign in and creating session for user
module.exports.createSession = function(req, res){
    return res.redirect('/');
};

// Sign out routes
module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) 
        res.redirect('/');
      })
    return res.redirect('/');
};