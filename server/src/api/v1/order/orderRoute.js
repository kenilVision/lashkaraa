const express = require('express');
const router = express.Router();
const { placeOrder , getUserOrders , updateOrderStatus , updatePaymentStatus , getSingleOrder } = require('./orderController');
const auth = require('../../../middlewares/auth')

router.post('/placeOrder', auth , placeOrder);
router.get('/userOrders/', auth , getUserOrders);
router.put('/updateStatus/:orderId', auth, updateOrderStatus);
router.put('/paymentStatus/:orderId', auth , updatePaymentStatus);
router.get('/:id', getSingleOrder);


module.exports = router;