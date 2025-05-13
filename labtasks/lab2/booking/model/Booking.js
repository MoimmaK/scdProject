const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingId: String,
    userId: String,
    carId: String,
    startDate: Date,
    endDate: Date,
    status: { type: String, enum: ['active', 'canceled'], default: 'active' }
});

module.exports = mongoose.model('Booking', bookingSchema);