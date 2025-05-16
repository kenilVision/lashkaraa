const Cart = require('../../../db/model/cart');
const mongoose = require('mongoose');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

    const createCartItem = async (req, res) => {
        const userId = req.user.userId;
        const {productId, quantity = 1, size, blousePadding , note } = req.body;
    
        if (!isValidObjectId(userId)) {
        return res.status(400).json({ error: 'Invalid or missing userId' });
        }
        if (!isValidObjectId(productId)) {
        return res.status(400).json({ error: 'Invalid or missing productId' });
        }
        if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ error: 'Quantity must be a positive integer' });
        }
    
        try {
        
        const cartItems = await Cart.find({ userId });
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
        if (totalQuantity >= 10) {
            return res.status(400).json({ error: 'Cart limit reached. Max 10 items allowed.' });
        }
    
        
        const existingItem = await Cart.findOne({ userId, productId, size });
    
        if (existingItem) {
            
            const newQuantity = existingItem.quantity + quantity;
    
        
            if (totalQuantity - existingItem.quantity + newQuantity > 10) {
            return res.status(400).json({ error: 'Adding this quantity exceeds the 10 item cart limit.' });
            }
    
            existingItem.quantity = newQuantity;
            if (note) existingItem.note = note; 
            const updatedItem = await existingItem.save();
            const populatedItem = await Cart.findById(updatedItem._id).populate('productId');

            return res.status(201).json({
            message: 'Cart updated',
            item: populatedItem,
            });
        }
    
        
        if (totalQuantity + quantity > 10) {
            return res.status(400).json({ error: 'Adding this quantity exceeds the 10 item cart limit.' });
        }
    
        
        const cartItem = new Cart({ userId, productId, quantity,blousePadding, size, note });
        const savedItem = await cartItem.save();

        const populatedItem = await Cart.findById(savedItem._id).populate('productId');

            return res.status(201).json({
            message: 'Cart updated',
            item: populatedItem,
            });
    
        } catch (err) {
        res.status(500).json({ error: 'Failed to create cart item', details: err.message });
        }
    };

    const getCartItemsByUser = async (req, res) => {
        const userId = req.user.userId;

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ error: 'Invalid userId' });
    }

    try {
        const cartItems = await Cart.find({ userId }).populate('productId');
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cart items', details: err.message });
    }
    };

    const deleteCartItem = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid cart item ID' });
    }

    try {
        const deleted = await Cart.findByIdAndDelete(id);
        if (!deleted) {
        return res.status(404).json({ error: 'Cart item not found' });
        }
        res.status(200).json({ message: 'Cart item deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete cart item', details: err.message });
    }
    };

    const createCartItems = async (req, res) => {
        const userId = req.user.userId;
        const {items} = req.body;    

        console.log(items)
      
        if (!isValidObjectId(userId)) {
          return res.status(400).json({ error: 'Invalid or missing userId' });
        }
      
        if (!Array.isArray(items) || items.length === 0) {
          return res.status(400).json({ error: 'Items must be a non-empty array' });
        }
      
        try {
          const existingCartItems = await Cart.find({ userId });
          let totalQuantity = existingCartItems.reduce((sum, item) => sum + item.quantity, 0);
      
          const results = [];
      
          for (const item of items) {
            const { productId, quantity = 1, size, blousePadding , note } = item;
      
            if (!isValidObjectId(productId)) {
              return res.status(400).json({ error: `Invalid productId: ${productId}` });
            }
      
            if (!Number.isInteger(quantity) || quantity <= 0) {
              return res.status(400).json({ error: `Invalid quantity for product: ${productId}` });
            }
      
            // Check if item already exists in the cart
            const existingItem = await Cart.findOne({ userId, productId, size });
      
            if (existingItem) {
              const newQuantity = existingItem.quantity + quantity;
              const newTotal = totalQuantity - existingItem.quantity + newQuantity;
      
              if (newTotal > 10) {
                return res.status(400).json({ error: 'Adding this quantity exceeds the 10 item cart limit.' });
              }
      
              existingItem.quantity = newQuantity;
              if (note) existingItem.note = note;
              const updatedItem = await existingItem.save();
              results.push(updatedItem);
              totalQuantity = newTotal;
            } else {
              if (totalQuantity + quantity > 10) {
                return res.status(400).json({ error: 'Adding this quantity exceeds the 10 item cart limit.' });
              }
      
              const newItem = new Cart({ userId, productId, quantity, blousePadding, size, note });
              const savedItem = await newItem.save();
              results.push(savedItem);
              totalQuantity += quantity;
            }
          }
      
          const populatedResults = await Cart.find({ _id: { $in: results.map(item => item._id) } }).populate('productId');

            return res.status(201).json({ message: 'Cart updated', items: populatedResults });
        } catch (err) {
          res.status(500).json({ error: 'Failed to update cart', details: err.message });
        }
      };

module.exports = { createCartItem , getCartItemsByUser , deleteCartItem  , createCartItems };