require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const chatRoutes = require('./routes/chat');
const blueprintRoutes = require('./routes/blueprint');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS - allow Vite dev server and production
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'https://godlycode.com',
    /localhost:\d+/
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/blueprint', blueprintRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'The divine forge is active', timestamp: new Date() });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/godlycode-divine')
  .then(() => {
    console.log('Connected to MongoDB — The divine records are open');
    app.listen(PORT, () => {
      console.log(`Divine server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    // Start server anyway so frontend can still work
    app.listen(PORT, () => {
      console.log(`Divine server running on port ${PORT} (without MongoDB)`);
    });
  });

module.exports = app;
