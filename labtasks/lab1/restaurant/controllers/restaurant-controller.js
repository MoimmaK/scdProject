const Restaurant = require('../models/restaurant');

exports.addRestaurant = async (req, res) => {
    try {
        const { name, location, menu } = req.body;
        const restaurant = new Restaurant({ name, location, menu });
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add restaurant.' });
    }
};

exports.getRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ error: 'Restaurant not found.' });
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch restaurant details.' });
    }
};

exports.listRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch restaurants.' });
    }
};
