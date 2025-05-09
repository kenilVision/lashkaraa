const router = require('express').Router();
const {addToWishlist, removeFromWishlist } = require('./wishlistController');

router.post('/', addToWishlist);  
router.delete('/', removeFromWishlist);  


module.exports = router;