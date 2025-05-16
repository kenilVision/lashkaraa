const Filter = require('../../../db/model/filter');

const createFilter = async (req, res) => {
 
    try {
        const { name} = req.body;
    
        if (!name ) {
          return res.status(400).json({ error: 'Name and slug are required' });
        }
    
        const existing = await Filter.findOne({ $or: [{ name }] });
        if (existing) {
          return res.status(400).json({ error: 'Filter with same name  already exists' });
        }
    
        const filter = new Filter({ name});
        await filter.save();
    
        res.status(201).json(filter);
      } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
      }

}

const getAllFilters = async (req, res) => {
    try {
        const filters = await Filter.find().sort({ created_at: -1 });
        res.json(filters);
      } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
      }
}   







 module.exports = { createFilter , getAllFilters };
