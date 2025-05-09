const express = require('express');
const router = express.Router();
const { placeOrder , getUserOrders , updateOrderStatus , updatePaymentStatus , getSingleOrder } = require('./orderController');


router.post('/placeOrder', placeOrder);
router.get('/userOrders/:userId', getUserOrders);
router.put('/updateStatus/:orderId', updateOrderStatus);
router.put('/paymentStatus/:orderId', updatePaymentStatus);
router.get('/:id', getSingleOrder);


module.exports = router;