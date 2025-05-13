const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: String,
    restaurantId: String,
    status: String,
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
