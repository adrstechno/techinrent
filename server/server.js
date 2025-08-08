
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
// Load environment variables
dotenv.config();
connectDB();

const allowedOrigins = [
  'https://tech-in-rent.vercel.app/'
];

const app = express();

app.use(cors());
app.use(express.json());


// Import routes
const contactRoutes = require('./routes/contactRoutes');
const bookDemoRoutes = require('./routes/bookDemoRoute');
const getInTouchRoutes = require('./routes/getInTouchRoutes');
const adminRoutes = require('./routes/adminRoutes');
const providerRoutes = require('./routes/providerRoutes');
const formRoutes = require('./routes/formRoutes');
const authRoutes = require('./routes/authRoutes');
const responseRoutes = require('./routes/responseRoutes');
const orderRoutes = require('./routes/orderRoute');

// Use routes
app.use('/api/contact', contactRoutes);
app.use('/api/book-demo', bookDemoRoutes);
app.use('/api/get-in-touch', getInTouchRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/provider', providerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/forms', responseRoutes);

app.get('/', (req, res) => {
  res.send('Backend is Running');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} 💙`);
});
