const express = require('express');
const { placeOrder } = require('../controllers/order-controller');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, placeOrder);
router.get('/:orderId/status', authenticateToken, trackOrder);//doesnt exist
router.get('/history/:customerId', authenticateToken, viewOrderHistory);
module.exports = router;
