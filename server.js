const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample dishes data
const dishes = [
  {
    id: 1,
    name: "Classic Cheese Burger",
    description: "Juicy beef patty with melted cheddar, lettuce, tomato, and our special sauce",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Crispy Chicken Wrap",
    description: "Crispy chicken strips with fresh veggies and ranch dressing in a tortilla wrap",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Vegetable Pasta",
    description: "Penne pasta with seasonal vegetables in creamy alfredo sauce",
    price: 6.49,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Loaded Nachos",
    description: "Corn chips topped with melted cheese, beans, jalapeños, and sour cream",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Breakfast Burrito",
    description: "Scrambled eggs, bacon, cheese, and hash browns in a large flour tortilla",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1584178639036-613ba57e5e39?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Grilled Cheese Sandwich",
    description: "Classic comfort food with three types of cheese on toasted sourdough",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Caesar Salad",
    description: "Crisp romaine, parmesan cheese, croutons, and creamy Caesar dressing",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "Pepperoni Pizza Slice",
    description: "Large slice of pizza with pepperoni, mozzarella, and our signature sauce",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    name: "French Fries",
    description: "Crispy golden fries with your choice of seasoning and dipping sauce",
    price: 1.99,
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    name: "Chocolate Brownie",
    description: "Rich, fudgy brownie topped with vanilla ice cream and chocolate sauce",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

// API Routes
app.get('/api/dishes', (req, res) => {
  res.json(dishes);
});

app.get('/api/dishes/:id', (req, res) => {
  const dish = dishes.find(d => d.id === parseInt(req.params.id));
  if (!dish) return res.status(404).json({ error: "Dish not found" });
  res.json(dish);
});

// Orders API - in a real app, this would connect to a database
let orders = [];

app.post('/api/orders', (req, res) => {
  const { items, totalPrice, customerInfo } = req.body;
  
  if (!items || !items.length || !totalPrice || !customerInfo) {
    return res.status(400).json({ error: "Missing required order information" });
  }
  
  const newOrder = {
    id: Date.now(),
    items,
    totalPrice,
    customerInfo,
    status: "pending",
    createdAt: new Date()
  };
  
  orders.push(newOrder);
  
  res.status(201).json({ 
    message: "Order created successfully", 
    orderId: newOrder.id 
  });
});

// Health check route
app.get('/', (req, res) => {
  res.send('College Canteen API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});