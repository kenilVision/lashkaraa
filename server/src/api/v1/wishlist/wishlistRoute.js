const router = require('express').Router();
const {addToWishlist, removeFromWishlist ,getWishlist } = require('./wishlistController');
const auth = require('../../../middlewares/auth')   
router.post('/',auth, addToWishlist);  
router.delete('/',auth, removeFromWishlist);  
router.get('/', auth, getWishlist)

module.exports = router;