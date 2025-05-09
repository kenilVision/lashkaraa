const router = require('express').Router();
const {createCartItem , getCartItemsByUser  , deleteCartItem } = require('./cartController');



router.post('/', createCartItem);
router.get('/:userId', getCartItemsByUser);
router.delete('/:id', deleteCartItem);

module.exports = router;