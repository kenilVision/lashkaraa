const Product = require("../../../db/model/product");
const fs = require("fs");
const path = require("path");
const Category =  require('../../../db/model/categories')
const SubCategory =  require('../../../db/model/subCategories')
    const createProduct = async (req, res) => {
      try {
        const {
          name,
          price,
          discount,
          sizes,
          productDetails,
          readyToShip,
          categoryId,
          subCategoryId,
          isFeatured,
          isBestseller,
        } = req.body;
    
        if (
          !name ||
          !price ||
          !discount ||
          !sizes ||
          !categoryId
        ) {
          return res.status(400).json({
            success: false,
            message: "Please provide all required fields.",
          });
        }

        const isReadyToShip = (Array.isArray(readyToShip) ? readyToShip[0] : readyToShip) === 'true' || readyToShip === true;
        const isFeaturedProduct = (Array.isArray(isFeatured) ? isFeatured[0] : isFeatured) === 'true' || isFeatured === true;
        const isBestsellerProduct = (Array.isArray(isBestseller) ? isBestseller[0] : isBestseller) === 'true' || isBestseller === true;

        console.log(isReadyToShip , readyToShip , isFeaturedProduct , isFeatured)

        const media = [];
        if (req.files?.images) {
          media.push(
            ...req.files.images.map((file) => ({
              url: `/public/products/${file.filename}`,
              type: 'image',
            }))
          );
        }
        if (req.files?.productVideos) {
          media.push({
            url: `/public/productVideos/${req.files.productVideos[0].filename}`,
            type: 'video',
          });
        }

        const category = await Category.findById(categoryId);
        if (!category) {
          return res.status(404).json({
            success: false,
            message: "Category not found.",
          });
        }
        const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');

        let subCategorySlug = null;
        let groupSlug = null; 
        
        if (subCategoryId) {
         
          const subCategory = await SubCategory.findById(subCategoryId);
          
          if (!subCategory) {
            return res.status(400).json({ success: false, message: "Subcategory not found." });
          }
        
         
          subCategorySlug = subCategory.name.toLowerCase().replace(/\s+/g, '-');
        
          
          if (subCategory.group) {
            groupSlug = subCategory.group.toLowerCase().replace(/\s+/g, '-');
          }
        }

          const productDetailsArray = productDetails
          ? JSON.parse(productDetails) 
          : [];

          
          const newProduct = new Product({
            name,
            price,
            discount,
            sizes: Array.isArray(sizes)
            ? sizes
            : JSON.parse(sizes).map(size => {
                if (
                  !size.label ||
                  !['Unstitched', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'Custom'].includes(size.label) ||
                  typeof size.quantity !== 'number'
                ) {
                  throw new Error('Invalid size format or values.');
                }
                return {
                  label: size.label,
                  quantity: size.quantity
                };
              }),
            productDetails: productDetailsArray,
            media, 
            readyToShip: isReadyToShip,
            isFeatured: isFeaturedProduct,
            isBestseller: isBestsellerProduct,
            categoryId,
            subCategoryId,
            categorySlug,
            subCategorySlug,
            groupSlug,
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

    const { embroidery, fabric, color , sort  } = req.query;

    let slugFilter = {};

    if (slug) {
      if (slug === 'ready-to-ship') {
        slugFilter = { readyToShip: true };
      } else if (slug === 'bestseller') {
        slugFilter = { isBestseller: true };
      } else {
        slugFilter = {
          $or: [
            { categorySlug: slug },
            { subCategorySlug: slug },
            { groupSlug: slug },
          ]
        };
      }
    }
    
    
    const filter = { ...slugFilter };

    if (embroidery) {
      const embroideryArray = embroidery.split(',').map(item => item.trim());
      filter['productDetails.embroidery'] = { $in: embroideryArray };
    }


    if (fabric) {
      const fabricArray = fabric.split(',').map(item => item.trim());
      filter['productDetails.fabric'] = { $in: fabricArray };
    }

    if (color) {
      const colorArray = color.split(',').map(item => item.trim());
      filter['productDetails.color'] = { $in: colorArray };
    }

    let sortCriteria = { createdAt: -1 }; 

    if (sort) {
      switch (sort.toLowerCase()) {
        case 'featured':
          sortCriteria = { featured: -1 };
          break;
        case 'bestseller':
          sortCriteria = { bestseller: -1 }; 
          break;
        case 'alphabetical-asc':
          sortCriteria = { name: 1 }; 
          break;
        case 'alphabetical-desc':
          sortCriteria = { name: -1 }; 
          break;
        case 'price':
          sortCriteria = { price: 1 }; 
          break;
        case 'price-desc':
          sortCriteria = { price: -1 }; 
          break;
        case 'date-asc':
          sortCriteria = { createdAt: 1 }; 
          break;
        case 'date-desc':
        default:
          sortCriteria = { createdAt: -1 }; 
          break;
      }
    }


    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sortCriteria);

    const totalProducts = await Product.countDocuments(filter);

    const allEmbroidery = await Product.distinct('productDetails.embroidery', slugFilter);
    const allFabric = await Product.distinct('productDetails.fabric', slugFilter);
    const allColor = await Product.distinct('productDetails.color', slugFilter);

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      products,
      filterUsed: slug ? { slug } : undefined,
      filterOptions: {
        embroidery: allEmbroidery,
        fabric: allFabric,
        color: allColor
      }
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
