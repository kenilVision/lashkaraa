const Wishlist = require('../../../db/model/wishlist');
const Product = require('../../../db/model/product');
const User = require('../../../db/model/user');

const addToWishlist = async (req, res) => {
    try {
      const { userId, productId } = req.body; 

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      
      const existingWishlistItem = await Wishlist.findOne({ userId, productId });
      if (existingWishlistItem) {
        return res.status(400).json({ success: false, message: 'Product already in wishlist' });
      }
  
      
      const newWishlistItem = new Wishlist({ userId, productId });
      await newWishlistItem.save();
  
      return res.status(201).json({
        success: true,
        message: 'Product added to wishlist',
        data: newWishlistItem,
      });

    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  const removeFromWishlist = async (req, res) => {
    try {
      const { wishlistId } = req.body;
  
      if (!wishlistId) {
        return res.status(400).json({ success: false, message: 'wishlistId is required' });
      }
  
      const deletedItem = await Wishlist.findByIdAndDelete(wishlistId);
  
      if (!deletedItem) {
        return res.status(404).json({ success: false, message: 'Wishlist item not found' });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Product removed from wishlist',
        data: deletedItem,
      });
    } catch (error) {
      console.error('Error removing wishlist item:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
  module.exports = { addToWishlist, removeFromWishlist };