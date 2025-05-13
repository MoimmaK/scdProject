const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    carId: { type: String, required: true, unique: true },
    model: String,
    location: String,
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Car', carSchema);