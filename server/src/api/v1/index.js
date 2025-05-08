const router = require('express').Router();
const categories = require('./categories/categoriesRoute')
const product = require('./product/productRoute')
// const auth = require('./authorization/authorizationRoute');


// router.use('/auth', auth);
router.use('/categories',categories )
router.use('/product',product )
module.exports = router;