const express = require('express');
const router = express.Router();
const bookingController = require('../controller/booking-controller');

router.post('/', bookingController.createBooking);

router.get('/:userId', bookingController.getUserBookings);

router.delete('/:bookingId', bookingController.cancelBooking);

module.exports = router;


