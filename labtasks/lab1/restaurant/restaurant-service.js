require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const restaurantRoutes = require('./routes/restaurantRoutes');

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/restaurants', restaurantRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Restaurant service running on port ${PORT}`));
