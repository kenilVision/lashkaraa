const router = require('express').Router();
const { login, signup, update, fetchUser, verifyEmail, resetPassword } = require('./authorizationController');
const auth = require('../../../middlewares/auth')


router.post('/login', login);
router.post('/signup', signup);
router.put('/update', auth, update);
router.get('/user', auth, fetchUser);
router.post('/forgot-password', verifyEmail);
router.post('/reset-password', resetPassword);

module.exports = router;                