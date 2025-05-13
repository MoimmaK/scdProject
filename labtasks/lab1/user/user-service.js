require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customerRoutes');

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/customers', customerRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Customer service running on port ${PORT}`));
