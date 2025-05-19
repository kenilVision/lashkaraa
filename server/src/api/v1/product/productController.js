const Product = require("../../../db/model/product");
const fs = require("fs");
const path = require("path");
const Category = require("../../../db/model/categories");
const SubCategory = require("../../../db/model/subCategories");
const ProductFilter = require("../../../db/model/productFilter");
const FilterOption = require("../../../db/model/filterOption");
const mongoose = require("mongoose");
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

    if (!name || !price || !discount || !sizes || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const isReadyToShip =
      (Array.isArray(readyToShip) ? readyToShip[0] : readyToShip) === "true" ||
      readyToShip === true;
    const isFeaturedProduct =
      (Array.isArray(isFeatured) ? isFeatured[0] : isFeatured) === "true" ||
      isFeatured === true;
    const isBestsellerProduct =
      (Array.isArray(isBestseller) ? isBestseller[0] : isBestseller) ===
        "true" || isBestseller === true;

    const media = [];
    if (req.files?.images) {
      media.push(
        ...req.files.images.map((file) => ({
          url: `/public/products/${file.filename}`,
          type: "image",
        }))
      );
    }
    if (req.files?.productVideos) {
      media.push({
        url: `/public/productVideos/${req.files.productVideos[0].filename}`,
        type: "video",
      });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }
    const categorySlug = category.name.toLowerCase().replace(/\s+/g, "-");

    let subCategorySlug = null;
    let groupSlug = null;

    if (subCategoryId && mongoose.Types.ObjectId.isValid(subCategoryId)) {
      const subCategory = await SubCategory.findById(subCategoryId);

      if (!subCategory) {
        return res
          .status(400)
          .json({ success: false, message: "Subcategory not found." });
      }

      subCategorySlug = subCategory.name.toLowerCase().replace(/\s+/g, "-");

      if (subCategory.group) {
        groupSlug = subCategory.group.toLowerCase().replace(/\s+/g, "-");
      }
    } else {
      delete req.body.subCategoryId;
    }

    console.log("hello");
    const productDetailsArray = productDetails
      ? JSON.parse(productDetails)
      : [];

    const newProduct = new Product({
      name,
      price,
      discount,
      sizes: Array.isArray(sizes)
        ? sizes
        : JSON.parse(sizes).map((size) => {
            if (
              !size.label ||
              ![
                "Unstitched",
                "XXS",
                "XS",
                "S",
                "M",
                "L",
                "XL",
                "Custom",
              ].includes(size.label) ||
              typeof size.quantity !== "number"
            ) {
              throw new Error("Invalid size format or values.");
            }
            return {
              label: size.label,
              quantity: size.quantity,
              fitting: size.fitting,
              blousePadding: size.blousePadding,
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

    const { embroidery, fabric, color, sort } = req.query;
    console.log(req.query);
    let slugFilter = {};

    if (slug) {
      if (slug === "ready-to-ship") {
        slugFilter = { readyToShip: true };
      } else if (slug === "bestseller") {
        slugFilter = { isBestseller: true };
      } else {
        slugFilter = {
          $or: [
            { categorySlug: slug },
            { subCategorySlug: slug },
            { groupSlug: slug },
          ],
        };
      }
    }

    const filter = { ...slugFilter };

    const filterOptionConditions = [];

    if (embroidery) {
      const embroideryArray = embroidery.split(",").map((item) => item.trim());
      const filterOptions = await FilterOption.find({
        slug: { $in: embroideryArray },
      });
      const embroideryOptionIds = filterOptions.map((option) => option._id);

      filterOptionConditions.push({
        filterOptionId: { $in: embroideryOptionIds },
      });
    }

    if (fabric) {
      const fabricArray = fabric.split(",").map((item) => item.trim());
      const filterOptions = await FilterOption.find({
        slug: { $in: fabricArray },
      });
      const fabricOptionIds = filterOptions.map((option) => option._id);
      filterOptionConditions.push({ filterOptionId: { $in: fabricOptionIds } });
    }

    if (color) {
      const colorArray = color.split(",").map((item) => item.trim());
      const filterOptions = await FilterOption.find({
        slug: { $in: colorArray },
      });
      const colorOptionIds = filterOptions.map((option) => option._id);
      filterOptionConditions.push({ filterOptionId: { $in: colorOptionIds } });
    }
    let filteredProductIds = null;

    if (filterOptionConditions.length > 0) {
      const productFilters = await ProductFilter.find({
        $or: filterOptionConditions,
      });

      const productIds = productFilters.map((pf) => pf.productId);
      filteredProductIds = [...new Set(productIds.map((id) => id.toString()))];
    }

    if (filteredProductIds) {
      filter._id = { $in: filteredProductIds };
    }

    let sortCriteria = { createdAt: -1 };

    if (sort) {
      switch (sort.toLowerCase()) {
        case "featured":
          sortCriteria = { featured: -1 };
          break;
        case "bestseller":
          sortCriteria = { bestseller: -1 };
          break;
        case "alphabetical-asc":
          sortCriteria = { name: 1 };
          break;
        case "alphabetical-desc":
          sortCriteria = { name: -1 };
          break;
        case "price":
          sortCriteria = { price: 1 };
          break;
        case "price-desc":
          sortCriteria = { price: -1 };
          break;
        case "date-asc":
          sortCriteria = { createdAt: 1 };
          break;
        case "date-desc":
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

    let slugData = {};

    if (slug) {
      if (slug === "ready-to-ship") {
        slugData = { "product.readyToShip": true };
      } else if (slug === "bestseller") {
        slugData = { "product.isBestseller": true };
      } else {
        slugData = {
          $or: [
            { "product.categorySlug": slug },
            { "product.subCategorySlug": slug },
            { "product.groupSlug": slug },
          ],
        };
      }
    }

    const filterData = await ProductFilter.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      { $match: slugData || {} },
      {
        $lookup: {
          from: "filteroptions",
          localField: "filterOptionId",
          foreignField: "_id",
          as: "filterOption",
        },
      },
      { $unwind: "$filterOption" },
      {
        $lookup: {
          from: "filters",
          localField: "filterOption.filterId",
          foreignField: "_id",
          as: "filter",
        },
      },
      { $unwind: "$filter" },
      {
        $group: {
          _id: {
            filterId: "$filter._id",
            optionSlug: "$filterOption.slug",
          },
          filterName: { $first: "$filter.name" },
          filterSlug: { $first: "$filter.slug" },
          optionValue: { $first: "$filterOption.value" },
          optionSlug: { $first: "$filterOption.slug" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.filterId",
          name: { $first: "$filterName" },
          slug: { $first: "$filterSlug" },
          options: {
            $push: {
              value: "$optionValue",
              slug: "$optionSlug",
              count: "$count",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          slug: 1,
          options: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      products,
      filters: filterData,
      filterUsed: slug ? { slug } : undefined,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const searchProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 16;
    const skip = (page - 1) * limit;
     const { embroidery, fabric, color, q: search , sort  } = req.query;

    //--- filter condition ----

    const filterOptionConditions = [];
      const filterableFields = { embroidery, fabric, color };

      for (const [field, value] of Object.entries(filterableFields)) {
        if (value) {
          const slugArray = value.split(",").map((item) => item.trim());
          const regexSlugs = slugArray.map(s => new RegExp(`^${s}$`, "i")); // case-insensitive match

          const filterOptions = await FilterOption.find({
            slug: { $in: regexSlugs },
          });

          const optionIds = filterOptions.map((option) => option._id);
          if (optionIds.length > 0) {
            filterOptionConditions.push({
              filterOptionId: { $in: optionIds },
            });
          }
        }
      }

      let filterProductIds = null;

      if (filterOptionConditions.length > 0) {
        const productFilters = await ProductFilter.find({
          $or: filterOptionConditions,
        });
        const productIds = productFilters.map((pf) => pf.productId);
        filterProductIds = [...new Set(productIds.map((id) => id.toString()))];
      }

    // --- Search conditions ---
    let searchConditions = [];  

    if (search) {
      const matchingFilterOptions = await FilterOption.find({
        value: { $regex: search, $options: "i" },
      }).select("_id");

      const matchingFilterOptionIds = matchingFilterOptions.map((fo) => fo._id);

      const matchingProductFilters = await ProductFilter.find({
        filterOptionId: { $in: matchingFilterOptionIds },
      }).select("productId");

      const matchingProductIds = matchingProductFilters.map(
        (pf) => pf.productId
      );

      searchConditions = [
        { name: { $regex: search, $options: "i" } },
        { "productDetails.description": { $regex: search, $options: "i" } },
        { _id: { $in: matchingProductIds } },
      ];
    }

    let filter = {};

    if (searchConditions.length && filterProductIds) {
      filter = {
        $and: [{ _id: { $in: filterProductIds } }, { $or: searchConditions }],
      };
    } else if (searchConditions.length) {
      filter = { $or: searchConditions };
    } else if (filterProductIds) {
      filter = { _id: { $in: filterProductIds } };
    }
    else {
  filter = {}; // no filters or search
    } 

    let sortCondition = {};

    if (sort === "price_asc") {
      sortCondition = { price: 1 }; 
    } else if (sort === "price_desc") {
      sortCondition = { price: -1 }; 
    }


    const products = await Product.find(filter).skip(skip).limit(limit).sort(sortCondition);
    const totalCount = await Product.countDocuments(filter)

    // ---------------------------------product ----------------------------------------------------------
    // Get all product IDs that match just the search (without current filters)
    const baseSearchQuery = searchConditions.length ? { $or: searchConditions } : {};
    const baseProductIds = (await Product.find(baseSearchQuery).select('_id'))
      .map(p => p._id.toString());

    // Get all product IDs that match current filters (including search)
    const filteredProductIds = (await Product.find(filter).select('_id'))
      .map(p => p._id.toString());

    // Get all product filters for products that match the base search
    const productFilters = await ProductFilter.find({
      productId: { $in: baseProductIds }
    }).select('productId filterOptionId');

    // Count filter options only for products that are in both sets
    const filterOptionCountMap = {};
    productFilters.forEach(({ productId, filterOptionId }) => {
      // Only count if product exists in filtered results
      if (filteredProductIds.includes(productId.toString())) {
        const key = filterOptionId.toString();
        filterOptionCountMap[key] = (filterOptionCountMap[key] || 0) + 1;
      }
    });

    // Get unique filter option IDs from the base search results
    const uniqueFilterOptionIds = [
      ...new Set(productFilters.map(pf => pf.filterOptionId.toString()))
    ];

    // Get filter options with their categories
    const filterOptions = await FilterOption.find({
      _id: { $in: uniqueFilterOptionIds }
    }).populate('filterId');

    // Group by filter category with counts
    const filtersGrouped = {};
    filterOptions.forEach(option => {
      const filterCategory = option.filterId;
      if (!filterCategory) return;

      const key = filterCategory._id.toString();
      if (!filtersGrouped[key]) {
        filtersGrouped[key] = {
          filterId: filterCategory._id,
          name: filterCategory.name,
          slug: filterCategory.slug,
          options: []
        };
      }

      filtersGrouped[key].options.push({
        _id: option._id,
        value: option.value,
        slug: option.slug,
        count: filterOptionCountMap[option._id.toString()] || 0
      });
    });

    res.json({
      success: true,
      page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      products,
      filters: Object.values(filtersGrouped), 
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
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const readToShipwithSlug = async (req, res) => {
  try {
    const page = 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    const { slug } = req.params;

    let filter = { readyToShip: true };

    if (slug) {
      filter = {
        readyToShip: true,
        $or: [
          { categorySlug: slug },
          { subCategorySlug: slug },
          { groupSlug: slug },
        ],
      };
    }

    const sortCriteria = { createdAt: -1 };

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sortCriteria);

    return res.status(200).json({
      success: true,
      data: {
        products,

        filterUsed: slug ? { slug } : undefined,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const celebCloset = async (req, res) => {
  try {
    const page = 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    let filter = { celebCloset: true };

    const sortCriteria = { createdAt: -1 };

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sortCriteria);

    return res.status(200).json({
      success: true,
      data: {
        products,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateCelebCloset = async (req, res) => {
  try {
    const { productId } = req.params;
    const { celebCloset } = req.body;
    let celebImage = null;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Handle file upload if exists
    if (req.file) {
      // Delete old image if it exists
      if (product.celebImage) {
        const oldImagePath = path.join(
          __dirname,
          "../../..",
          product.celebImage
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      celebImage = `/public/celebImages/${req.file.filename}`;
    }

    // Prepare update object
    const updateData = {
      celebCloset: celebCloset === "true" || celebCloset === true,
    };

    if (celebImage) {
      updateData.celebimg = celebImage;
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Celeb closet status updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating celeb closet:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductBySlug,
  readToShipwithSlug,
  celebCloset,
  updateCelebCloset,
  searchProduct,
};
