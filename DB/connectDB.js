// connectDB.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connectionUrl = process.env.DB_URI ||  'mongodb://localhost:27017/internship'
        await mongoose.connect(connectionUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

module.exports = connectDB;







