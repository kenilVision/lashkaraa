const Product = require("../../../db/model/product");
const fs = require("fs");
const path = require("path");
const Category =  require('../../../db/model/categories')
const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      originalPrice,
      discount,
      sizes,
      productDetails,
      readyToShip,
      categoryId,      
      subCategoryId,   
      itemId,          
    } = req.body;

    
    if (
      !name ||
      !price ||
      !originalPrice ||
      !discount ||
      !sizes ||
      !categoryId 
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide all required fields.",
        });
    }

    const isReadyToShip = readyToShip !== undefined ? readyToShip : false;

    const images = req.files.images
      ? req.files.images.map((file) => `/public/products/${file.filename}`)
      : [];
    const video =
      req.files.productVideos && req.files.productVideos[0]
        ? `/public/productVideos/${req.files.productVideos[0].filename}`
        : null;

        const category = await Category.findById(categoryId);
        if (!category) {
          return res.status(404).json({ 
            success: false, 
            message: "Category not found." 
          });
        }
        const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');


        let subCategorySlug = null;
        let itemSlug = null;
    
        
        if (subCategoryId) {
          const subCategory = category.subCategories.find(
            sub => sub._id.toString() == subCategoryId
          );
          if (!subCategory) {
            return res.status(400).json({ success: false, message: "Subcategory not found." });
          }
          subCategorySlug = subCategory.name.toLowerCase().replace(/\s+/g, '-');
    
          
          if (itemId) {
            const item = subCategory.items.find(item => item._id.toString() === itemId);
            if (!item) {
              return res.status(400).json({ success: false, message: "Item not found." });
            }
            itemSlug = item.name.toLowerCase().replace(/\s+/g, '-');
          }
        }
    
    const newProduct = new Product({
      name,
      price,
      originalPrice,
      discount,
      sizes: sizes.split(",").map(item => item.trim()),
      productDetails: JSON.parse(productDetails),
      images,
      video,
      readyToShip: isReadyToShip,
      categoryId, 
      subCategoryId,   
      itemId,        
      categorySlug,
      subCategorySlug,
      itemSlug,  
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

    const getAllProducts = async (req, res) => {
    try {
    const page = parseInt(req.query.page) || 1;
    const limit = 16; 
    const skip = (page - 1) * limit;

    const { slug } = req.params; 

    const filter = {};  

    if (slug) {
      filter.$or = [
        { categorySlug: slug },
        { subCategorySlug: slug },
        { itemSlug: slug },
      ];

      if (slug.toLowerCase() === 'true' || slug.toLowerCase() === 'false') {
        filter.$or.push({ readyToShip: slug.toLowerCase() === 'true' });
      }
    }

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments(filter);

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      products,
      filterUsed: slug ? { slug } : undefined,
    });


    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
     };
  

     const getProductBySlug = async (req, res) => {
    try {
      const { slug } = req.params;
  
      const product = await Product.findOne({ slug });
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found." });
      }
  
      return res.status(200).json({ success: true, product });
    } catch (error) {
      console.error("Error fetching product by slug:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
    };

module.exports = { 
    createProduct,
    getAllProducts,
    getProductBySlug
 };
