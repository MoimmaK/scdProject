const User = require('../model/User');

exports.registerUser = async (req, res) => {
    const { userId, name, email } = req.body;
    try {
        const user = new User({ userId, name, email });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateActiveBookings = async (req, res) => {
    const { activeBookings } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { userId: req.params.userId },
            { activeBookings },
            { new: true }
        );
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
