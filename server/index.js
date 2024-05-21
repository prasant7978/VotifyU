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
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/position', require('./routes/positionRoutes'));
app.use('/api/candidate', require('./routes/candidateRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));

// routes to access/get images from uploads folder
app.use('/api/uploads/profile', express.static('uploads/profile'));
app.use('/api/uploads/campaign', express.static('uploads/campaign'));
app.use('/api/uploads/files', express.static('uploads/files'));

// server listen
app.listen(process.env.PORT || 3001, '192.168.93.221', () => {
    console.log(`server running on port ${process.env.PORT}...`.bgGreen.white);
})