const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const cors = require('cors');


// Load environment variables
require('dotenv').config();


const app = express();

app.use(cors()); // Allow all origins for development

// Middleware to parse JSON
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const drugRoutes = require('./routes/drugRoutes');
const orderRoutes = require('./routes/orderRoutes');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/drugs', drugRoutes);
app.use('/api/orders', orderRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('✅ Drug Inventory Management Backend is running');
});

// Start Server after DB Sync
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }) // Use { force: true } during development to recreate tables
  .then(() => {
    console.log('📦 Database connected and models synced');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ DB connection failed:', err);
  });
