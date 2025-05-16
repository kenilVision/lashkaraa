const router = require('express').Router();
const { createProductFilter , getProductFilter } = require('./productfilterController');

router.post('/', createProductFilter);  
router.get('/', getProductFilter);


module.exports = router;