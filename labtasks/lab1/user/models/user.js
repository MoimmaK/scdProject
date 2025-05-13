const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    password: String,
    preferences: [String],
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
