const mongoose = require('mongoose');
const Dish = require('./models/Dish');
const connectDB = require('./db');
require('dotenv').config();

const dishes = [
  {
    name: "Classic Cheese Burger",
    description: "Juicy beef patty with melted cheddar, lettuce, tomato, and our special sauce",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Burgers"
  },
  {
    name: "Crispy Chicken Wrap",
    description: "Crispy chicken strips with fresh veggies and ranch dressing in a tortilla wrap",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Wraps"
  },
  {
    name: "Vegetable Pasta",
    description: "Penne pasta with seasonal vegetables in creamy alfredo sauce",
    price: 6.49,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Pasta"
  },
  // ...rest of the dishes from your original array
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing dishes
    await Dish.deleteMany({});
    console.log('Dishes collection cleared');
    
    // Insert new dishes
    const createdDishes = await Dish.insertMany(dishes);
    console.log(`${createdDishes.length} dishes created`);
    
    mongoose.disconnect();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};
const path = require('path');
const Dish = require(path.join(__dirname, 'models', 'Dish'));

seedDatabase();