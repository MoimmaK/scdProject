const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: String,
    email: { type: String, unique: true },
    maxBookings: { type: Number, default: 5 },
    activeBookings: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
