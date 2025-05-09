const router = require('express').Router();
const { login , signup , update } = require('./authorizationController');
const auth = require('../../../middlewares/auth')


router.post('/login', login);
router.post('/signup', signup); 
router.put('/update', auth, update);



module.exports = router;