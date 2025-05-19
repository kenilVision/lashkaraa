const ProductFilter = require("../../../db/model/productFilter");

const createProductFilter = async (req, res) => {
  try {
    const { productId, filterOptionId } = req.body;

    if (!productId || !filterOptionId) {
      return res.status(400).json({ error: 'productId and filterOptionId are required' });
    }

    
    const existing = await ProductFilter.findOne({ productId, filterOptionId });
    if (existing) {
      return res.status(400).json({ error: 'This filter is already applied to this product' });
    }

   
    const productFilter = new ProductFilter({ productId, filterOptionId });
    await productFilter.save()

    res.status(201).json({
      message: 'Filter applied and product updated successfully',
      productFilter,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

const getProductFilter = async (req, res) => {
  try {
    const productFilters = await ProductFilter.find()
      .populate("productId", "name slug")
      .populate("filterOptionId", "value slug")
      .exec();

    const grouped = {};

    for (const item of productFilters) {
      const product = item.productId;
      const filterOption = item.filterOptionId;

      if (!grouped[product._id]) {
        grouped[product._id] = {
          productId: product._id,
          name: product.name,
          slug: product.slug,
          filterOptions: [],
        };
      }

      grouped[product._id].filterOptions.push({
        value: filterOption.value,
        slug: filterOption.slug,
        id: filterOption._id,
      });
    }

    const result = Object.values(grouped);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

module.exports = { createProductFilter, getProductFilter };
