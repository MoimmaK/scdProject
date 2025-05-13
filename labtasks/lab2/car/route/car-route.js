const express = require('express');
const router = express.Router();
const carController = require('../controller/car-controller');

router.post('/', carController.addCar);
router.get('/:carId', carController.getCar);
router.put('/:carId', carController.updateCarAvailability);

module.exports = router;
