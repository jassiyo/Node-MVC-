const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controller/user_controller');

// router
router.get('/profile', passport.checkAuthentication, userController.profile)
router.get('/sign-up', userController.signUp)
router.get('/sign-in', userController.signIn)
router.post('/create', userController.create)

// user passport as a middlware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'}
), userController.createSession);


router.get('/sign-out', userController.destroySession);


module.exports = router
