require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Order service running on port ${PORT}`));
