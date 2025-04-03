const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();

// Import models
const Dish = require('./models/Dish');
const Order = require('./models/Order');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// ✅ Apply CORS Middleware Before Routes
app.use(cors({ 
  origin: "https://college-canteen-frontend.vercel.app",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

// API Routes for Dishes
app.get('/api/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (error) {
    console.error('Error fetching dishes:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/dishes/:id', async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }
    res.json(dish);
  } catch (error) {
    console.error('Error fetching dish:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/dishes', async (req, res) => {
  try {
    const newDish = new Dish(req.body);
    const savedDish = await newDish.save();
    res.status(201).json(savedDish);
  } catch (error) {
    console.error('Error creating dish:', error);
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/dishes/:id', async (req, res) => {
  try {
    const updatedDish = await Dish.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDish) {
      return res.status(404).json({ error: "Dish not found" });
    }
    res.json(updatedDish);
  } catch (error) {
    console.error('Error updating dish:', error);
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/dishes/:id', async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }
    res.json({ message: "Dish deleted successfully" });
  } catch (error) {
    console.error('Error deleting dish:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// API Routes for Orders
app.post('/api/orders', async (req, res) => {
  try {
    const { items, totalPrice, customerInfo } = req.body;
    
    if (!items || !items.length || !totalPrice || !customerInfo) {
      return res.status(400).json({ error: "Missing required order information" });
    }
    
    const newOrder = new Order({
      items,
      totalPrice,
      customerInfo,
      status: "pending"
    });
    
    const savedOrder = await newOrder.save();
    
    res.status(201).json({ 
      message: "Order created successfully", 
      orderId: savedOrder._id 
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(400).json({ error: error.message });
  }
});

// ✅ Health Check Route
app.get('/', (req, res) => {
  res.send('College Canteen API is running');
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
