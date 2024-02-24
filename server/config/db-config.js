const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to database ${mongoose.connection.host}...`.bgGreen.white);
    } catch (error) {
        console.log(`Error in connecting db: ${error}`.bgRed.white);
    }
}

module.exports = connectDB;