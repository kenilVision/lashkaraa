const Cart = require('../../../db/model/cart');
const mongoose = require('mongoose');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

    const createCartItem = async (req, res) => {
        const { userId, productId, quantity = 1, size, note } = req.body;
    
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
            return res.status(200).json(updatedItem);
        }
    
        
        if (totalQuantity + quantity > 10) {
            return res.status(400).json({ error: 'Adding this quantity exceeds the 10 item cart limit.' });
        }
    
        
        const cartItem = new Cart({ userId, productId, quantity, size, note });
        const savedItem = await cartItem.save();
        res.status(201).json(savedItem);
    
        } catch (err) {
        res.status(500).json({ error: 'Failed to create cart item', details: err.message });
        }
    };

    const getCartItemsByUser = async (req, res) => {
    const { userId } = req.params;

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


module.exports = { createCartItem , getCartItemsByUser , deleteCartItem};