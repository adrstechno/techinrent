const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors')




require('dotenv').config();
connectDB();
// Importing routes
const contactRoutes = require('./routes/contactRoutes');
const bookDemoRoutes = require('./routes/bookDemoRoute');
const getInTouchRoutes = require('./routes/getInTouchRoutes');
const adminRoutes = require('./routes/adminRoutes');
const providerRoutes = require('./routes/providerRoutes')

// Initializing express app
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);
app.use('/api/book-demo', bookDemoRoutes);
app.use('/api/get-in-touch', getInTouchRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/provider', providerRoutes);

app.get('/', (req, res) => {
    res.send('Backend is Running');
})

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} 💙`);
})