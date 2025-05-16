const FilterOption = require('../../../db/model/filterOption');

const createFilterOption = async (req, res) => {
 
    try {
    const { filterId, value } = req.body;

    if (!filterId || !value) {
      return res.status(400).json({ error: 'filterId and value are required' });
    }

    

    const existing = await FilterOption.findOne({ filterId, value });
    if (existing) {
      return res.status(400).json({ error: 'Filter option already exists for this filter' });
    }

    const option = new FilterOption({ filterId, value });

    await option.save();

    res.status(201).json(option);

  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }

}

const getAllFiltersOption = async (req, res) => {
    try {
     
      const options = await FilterOption.find()
        .populate('filterId', 'name slug')  
        .exec();
  
      res.json(options);
    } catch (err) {
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  };  







 module.exports = { createFilterOption , getAllFiltersOption };
