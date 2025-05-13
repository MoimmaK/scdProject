const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bookingRoutes = require('./route/booking-route');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected successfully'))
  .catch(error => console.error('MongoDB connection error:', error));

app.use('/bookings', bookingRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => console.log(`Booking Service running on port ${PORT}`));


