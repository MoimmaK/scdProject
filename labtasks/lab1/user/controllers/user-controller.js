const Customer = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/auth');

exports.registerCustomer = async (req, res) => {
    try {
        const { name,password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const customer = new Customer({ name,  password: hashedPassword });
        await customer.save();

        const token = generateToken({ id: customer._id, role: 'customer' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register customer.' });
    }
};

exports.getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ error: 'Customer not found.' });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customer details.' });
    }
};

exports.updatePreferences = async (req, res) => {
    try {
        const { preferences } = req.body;
        const customer = await Customer.findByIdAndUpdate(req.params.id, { preferences }, { new: true });
        if (!customer) return res.status(404).json({ error: 'Customer not found.' });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update preferences.' });
    }
};
