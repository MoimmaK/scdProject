const express = require('express');
const { addRestaurant, getRestaurant, listRestaurants } = require('../controllers/restaurant-controller');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken,  addRestaurant);
router.get('/:id', authenticateToken, getRestaurant);
router.get('/', authenticateToken, listRestaurants);

module.exports = router;
