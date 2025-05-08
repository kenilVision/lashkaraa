const router = require('express').Router();
const {   registerUser } = require('./authorizationController');
const auth = require('../../../middlewares/auth')


router.post('/user/register', auth, registerUser)
module.exports = router;