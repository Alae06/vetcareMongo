const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const ownerRoutes = require('./src/routes/ownerRoutes');
const petRoutes = require('./src/routes/petRoutes');
const visitRoutes = require('./src/routes/visitRoutes');
const vetRoutes = require('./src/routes/vetRoutes');

// Use routes
app.use('/api/owners', ownerRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/vets', vetRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('VetCare 360 API is running');
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vetcare')
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  }); 
  app.use((req, res, next) => {
    res.status(404).json({ error: 'The requested path could not be found' });
  });