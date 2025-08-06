const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();


require('dotenv').config();
connectDB();
// Importing routes
// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Routes
const contactRoutes = require('./routes/contactRoutes');
const bookDemoRoutes = require('./routes/bookDemoRoute');
const getInTouchRoutes = require('./routes/getInTouchRoutes');
const adminRoutes = require('./routes/adminRoutes');
const providerRoutes = require('./routes/providerRoutes');
const orderRoutes = require('./routes/orderRoute');
const formRoutes = require('./routes/formRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/contact', contactRoutes);
app.use('/api/book-demo', bookDemoRoutes);
app.use('/api/get-in-touch', getInTouchRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/provider', providerRoutes);
app.use('/api/form', formRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Backend is Running');
})

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} 💙`);
});
