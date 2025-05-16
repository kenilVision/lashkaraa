const router = require('express').Router();
const {createFilterOption , getAllFiltersOption} = require('./filterOptionController');

router.post('/', createFilterOption);  
router.get('/', getAllFiltersOption);


module.exports = router;