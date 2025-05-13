const Order = require('../models/order');
const axios = require('axios');

exports.placeOrder = async (req, res) => {
    try {
        const { customerId, restaurantId, status } = req.body;

        await axios.get(`http://localhost:5001/restaurants/${restaurantId}`);

        await axios.get(`http://localhost:5002/customers/${customerId}`);


        const order = new Order({ customerId, restaurantId, status: 'Placed' });
        await order.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.viewOrderHistory = async (req, res) => {
    try {
        const { customerId } = req.params;

        const orders = await Order.find({ customerId });
        if (orders.length === 0) {
            return res.status(404).json({ error: 'No orders found for this customer' });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
