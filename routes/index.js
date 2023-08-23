const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller')

console.log('Router loaded')

router.get('/', homeController.home)
router.use('/user', require('./user'))

module.exports = router;