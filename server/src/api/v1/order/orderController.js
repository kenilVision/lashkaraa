const Order = require('../../../db/model/order'); 

    const placeOrder= async (req, res) => {
    const { userId, shippingAddress,billingAddress, items, paymentMethod = 'cod' } = req.body;

    try { 

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: 'Order items are required' });
        }
    
        // Calculate total amount
        const totalAmount = items.reduce((total, item) => {
            const itemTotal = (item.price || 0) * (item.quantity || 1);
            return total + itemTotal;
        }, 0);
        const newOrder = new Order({
        userId,
        totalAmount,
        shippingAddress,
        billingAddress,
        paymentMethod,
        items,
        orderStatus: [{ status: 'pending' }], 
        statusTimeline: [{
            title: 'Order Placed',
            status: 'pending',
            timeLogged: Date.now(),
        }],
        });

    
        await newOrder.save();
        res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ success: false, message: 'Failed to place order', error: error.message });
    }
    };


    const getUserOrders = async (req, res) => {
    const { userId } = req.params;  
    try {
  
      const orders = await Order.find({ userId }).sort({ created_at: -1 });  
      if (orders.length === 0) {
        return res.status(404).json({ success: false, message: 'No orders found for this user' });
      }
  
    
      res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error('Error fetching user orders:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
    }
     };
  

    const updateOrderStatus = async (req, res) => {
        const { orderId } = req.params;  
        const { status, title } = req.body;  
        
        
        if (!status || !title) {
        return res.status(400).json({ success: false, message: 'Status and title are required' });
        }
    
        try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
    
        
        order.orderStatus.push({ status, timestamp: Date.now() }); 
        order.statusTimeline.push({ title, status: 'pending', timeLogged: Date.now() }); 
    
        
        await order.save();
        
        res.status(200).json({ success: true, message: 'Order status updated successfully', order });
        } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ success: false, message: 'Failed to update order status', error: error.message });
        }
    };


    const updatePaymentStatus = async (req, res) => {
        const { orderId } = req.params;
        const { status } = req.body;
        
        if (!status) {
        return res.status(400).json({ success: false, message: 'Payment status is required' });
        }
    
        try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
    
        
        order.paymentStatus = status;

        await order.save();
    
        res.status(200).json({
            success: true,
            message: 'Payment status updated and logged',
            order
        });
        } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update payment status',
            error: error.message
        });
        }
    };
  

    const getSingleOrder = async (req, res) => {
        try {
        const { id } = req.params;
    
        const order = await Order.findById(id)
            .populate('userId', 'fullname email phone') 
            .populate('items.productId', 'name images'); 
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
    
        res.status(200).json({ success: true, order });
        } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving order', error: error.message });
        }
    };
  

  

module.exports = { placeOrder , getUserOrders , updateOrderStatus  , updatePaymentStatus , getSingleOrder };
