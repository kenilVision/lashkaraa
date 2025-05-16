const { default: mongoose } = require('mongoose');
const categories =  require('../../../db/model/categories')
const subCategory = require('../../../db/model/subCategories');
const path = require('path');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !req.files?.image?.[0]) {
      return res.status(400).json({ success: false, message: 'Name and image are required' });
    }

    const existing = await categories.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Category already exists' });
    }

    const category = await categories.create({
      name: name.trim(),
      image: path.basename(req.files.image[0].path)
    });

    return res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addSubCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, group } = req.body;

    if (!name ) {
      return res.status(400).json({ success: false, message: 'Subcategory name and image are required' });
    }

   
    const category = await categories.findById(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    
    const existing = await subCategory.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Subcategory already exists' });
    }

    const imagePath = req.files?.subCategoryImage?.[0]?.path 
    ? path.basename(req.files.subCategoryImage[0].path) 
    : null;

    const SubCategory = await subCategory.create({
      categoryId,
      name: name.trim(),
       image: imagePath,
      group: group?.trim() || ''
    });

    return res.status(201).json({ success: true, data: SubCategory });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categoriesList = await categories.aggregate([
      {
        $lookup: {
          from: 'subcategories',            
          localField: '_id',                
          foreignField: 'categoryId',      
          as: 'subcategories'               
        }
      },
      { 
        $sort: { createdAt: -1 }            
      }
    ]);
    

    if (!categoriesList.length) {
      return res.status(404).json({ success: false, message: 'No categories found' });
    }

    return res.status(200).json({
      success: true,
      data: categoriesList
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const getLatestSubcategories = async (req, res) => {
  try {
    const latestSubcategories = await subCategory.aggregate([
      {
        $sort: { createdAt: -1 }  // Sort by creation date, descending
      },
      { 
        $limit: 3  // Get the latest 3 subcategories
      }
    ]);

    if (!latestSubcategories.length) {
      return res.status(404).json({ success: false, message: 'No subcategories found' });
    }

    return res.status(200).json({
      success: true,  
      data: latestSubcategories
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await categories.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(categoryId) }
      },
      {
        $lookup: {
          from: 'subcategories',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'subCategories'
        }
      }
    ]);

    if (!category || category.length === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    return res.status(200).json({ success: true, data: category[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await categories.findById(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

   
    await subCategory.deleteMany({ categoryId });

  
    await category.remove();

    return res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const deleteSubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;

    const subCategoryItem = await subCategory.findById(subCategoryId);
    if (!subCategoryItem) {
      return res.status(404).json({ success: false, message: 'Subcategory not found' });
    }

    await subCategoryItem.remove();

    return res.status(200).json({ success: true, message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createCategory , addSubCategory , getAllCategories, getCategoryById , deleteCategory , deleteSubCategory , getLatestSubcategories};