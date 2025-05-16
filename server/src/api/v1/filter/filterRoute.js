const router = require('express').Router();
const { createFilter , getAllFilters } = require('./filterController');

router.post('/', createFilter);  
router.get('/', getAllFilters);


module.exports = router;