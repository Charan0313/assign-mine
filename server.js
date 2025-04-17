require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const stockRoutes = require('./routes/stockRoutes');
const alertRoutes = require('./routes/alertRoutes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/stock', stockRoutes);
app.use('/api/alert', alertRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
