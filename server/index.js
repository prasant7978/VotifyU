const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db-config')

// dotenv configure
dotenv.config()

// mongoDB connection
connectDB();

// rest object creation
const app = express()

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/post', require('./routes/postRoutes'));

// server listen
app.listen(process.env.PORT || 3001,'192.168.158.6', () => {
    console.log(`server running on port ${process.env.PORT}...`.bgGreen.white);
})