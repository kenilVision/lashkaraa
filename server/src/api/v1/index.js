const router = require('express').Router();
const categories = require('./categories/categoriesRoute')
const product = require('./product/productRoute')
const auth = require('./authorization/authorizationRoute');
const wishlist = require('./wishlist/wishlistRoute')
const cart = require('./cart/cartRoute')
const order = require('./order/orderRoute')
const filter = require('./filter/filterRoute')
const filterOption = require('./filterOption/filterOptionRoute')
const productFilter = require('./productFilter/productFilterRoute')

router.use('/auth', auth);
router.use('/categories',categories )
router.use('/product',product )
router.use('/wishlist',wishlist )
router.use('/cart',cart)
router.use('/order', order)
router.use('/filter', filter);
router.use('/filterOption', filterOption);
router.use('/productFilter', productFilter );
module.exports = router;