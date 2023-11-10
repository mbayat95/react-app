const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a simple schema for items
const ItemSchema = new mongoose.Schema({
  data: String
});
const Item = mongoose.model('Item', ItemSchema);

// POST endpoint
app.post('/data', async (req, res) => {
  const newItem = new Item({ data: req.body.data });
  await newItem.save();
  res.status(201).send('Data saved');
});

// GET endpoint
app.get('/data', async (req, res) => {
  const items = await Item.find({});
  res.status(200).json(items);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
