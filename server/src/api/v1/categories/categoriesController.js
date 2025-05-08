const categories =  require('../../../db/model/categories')
const path = require('path');

const createCategory = async (req, res) => {
    try {

        const { name} = req.body;
        if (!name || !req.files?.image) {
          return res.status(400).json({ success: false, message: 'name and image are required' });
        }
    
        const exists = await categories.findOne({ name: name.trim() });
        if (exists) {
          return res.status(409).json({ success: false, message: 'category exists' });
        }
        
        let subCategories = []
        if (req.body.subCategories) {
          subCategories = typeof req.body.subCategories === 'string'
            ? JSON.parse(req.body.subCategories)
            : req.body.subCategories;
        }

        const payload = {
          name: name.trim(),
          image: path.basename(req.files?.image?.[0]?.path || ''),
          subCategories: []
        };
    
        let itemImageIndex = 0;

          if (Array.isArray(subCategories)) {
            payload.subCategories = subCategories.map((sc, subIndex) => {
              const entry = {
                name: sc.name.trim(),
                image: path.basename(req.files?.subCategoryImages?.[subIndex]?.path || ''),
              };

              if (Array.isArray(sc.items)) {
                entry.items = sc.items.map((item) => {
                  const image = path.basename(req.files?.itemImages?.[itemImageIndex]?.path || '');
                  itemImageIndex++; // advance only if item processed
                  return {
                    name: item.name.trim(),
                    image,
                  };
                });
              }

              return entry;
            });
          }
        const category = await categories.create(payload);
        return res.status(201).json({ success: true, data: category });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};


const addSubCategory = async (req, res) => {
  try {
      const { categoryId } = req.params;
      let { name, items } = req.body;
      

      if (!name || !req.files?.subCategoryImage) {
          return res.status(400).json({ success: false, message: 'Subcategory name and image are required' });
      }

      
      items = typeof items === 'string' ? JSON.parse(items) : items;

      const category = await categories.findById(categoryId);
      if (!category) {
          return res.status(404).json({ success: false, message: 'Category not found' });
      }

     
      const subCategory = {
          name: name.trim(),
          image: path.basename(req.files?.subCategoryImage?.[0]?.path || ''),
          items: []
      };

      
      if (Array.isArray(items)) {
          subCategory.items = items.map((item, index) => {
              const image = path.basename(req.files?.itemImages?.[index]?.path || '');
              return {
                  name: item.name.trim(),
                  image,
              };
          });
      }

     
      category.subCategories.push(subCategory);
      await category.save();

      return res.status(201).json({ success: true, data: category });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
  }
};


const getAllCategories = async (req, res) => {
  try {
    
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    
    
    const skip = (page - 1) * limit;

    
    const categoriesList = await categories.find().skip(skip).limit(limit);
    
    
    const totalCount = await categories.countDocuments();

    if (!categoriesList || categoriesList.length === 0) {
      return res.status(404).json({ success: false, message: 'No categories found' });
    }

    
    return res.status(200).json({
      success: true,
      data: categoriesList,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Find the category by its ID
    const category = await categories.findById(categoryId);
    
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

  
    const category = await categories.findByIdAndDelete(categoryId);
    
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    return res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.params;

    
    const category = await categories.findById(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    
    const subCategoryIndex = category.subCategories.findIndex(sc => sc._id.toString() === subCategoryId);
    if (subCategoryIndex === -1) {
      return res.status(404).json({ success: false, message: 'Subcategory not found' });
    }

    
    category.subCategories.splice(subCategoryIndex, 1);
    await category.save();

    return res.status(200).json({ success: true, message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createCategory , addSubCategory , getAllCategories, getCategoryById , deleteCategory , deleteSubCategory};