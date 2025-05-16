const router = require('express').Router();
const {createCartItem , getCartItemsByUser  , deleteCartItem , createCartItems } = require('./cartController');
const auth = require('../../../middlewares/auth');


router.post('/', auth , createCartItem);
router.get('/', auth , getCartItemsByUser);
router.delete('/:id', auth , deleteCartItem);
router.post('/create', auth , createCartItems);

module.exports = router;