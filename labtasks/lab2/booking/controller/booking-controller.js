const axios = require('axios');
const Booking = require('../model/Booking');

const USER = process.env.USER_PORT || 'http://localhost:4001';
const CAR = process.env.CAR_PORT || 'http://localhost:4002';

exports.createBooking = async (req, res) => {
    const { bookingId, userId, carId, startDate, endDate } = req.body;

    try {
        //  Check User & Booking Limit
        const userResponse = await axios.get(`${USER}/users/${userId}`);
        const user = userResponse.data;

        if (user.activeBookings >= user.maxBookings) {
            return res.status(400).json({ error: "Booking limit reached" });
        }

        // Check Car Availability
        const carResponse = await axios.get(`${CAR}/cars/${carId}`);
        const car = carResponse.data;

        if (!car.isAvailable) {
            return res.status(400).json({ error: "Car not available" });
        }

        // Update Car & User Data
        await axios.put(`${CAR}/cars/${carId}`, { isAvailable: false });
        await axios.put(`${USER}/users/${userId}`, { activeBookings: user.activeBookings + 1 });

        // Save Booking
        const booking = new Booking({ bookingId, userId, carId, startDate, endDate, status: 'active' });
        await booking.save();

        res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
        console.error("Error in createBooking:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId });
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error in getUserBookings:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findOne({ bookingId: req.params.bookingId });
        //Check If Booking Exists
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        if (booking.status === 'canceled') {
            return res.status(400).json({ error: "Booking is already canceled" });
        }

        // Update Car & User Data
        await axios.put(`${CAR}/cars/${booking.carId}`, { isAvailable: true });


        const userResponse = await axios.get(`${USER}/users/${booking.userId}`);
        const user = userResponse.data;
        await axios.put(`${USER}/users/${booking.userId}`, { activeBookings: Math.max(user.activeBookings - 1, 0) });

        // Update booking status
        booking.status = 'canceled';
        await booking.save();

        res.json({ message: "Booking canceled successfully", booking });
    } catch (error) {
        console.error("Error in cancelBooking:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
