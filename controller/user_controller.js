module.exports.profile = function(req,res){
    
    return res.render('user_profile', {
        title: 'User Profile'
    })
    // res.end('<h1> User profile </h1>')
}


// render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign-up', { 
        title: 'Codeial | Sign Up'
})
} 
// reder the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign-in',{
        title: 'Codeial | Sign In'
    })
}

// Get data for sign up page 
module.exports.create = function(req,res){
// TODO later
}
//Sign in and creating session for user
module.exports.createSession = function(req, res){
// TODO later
};