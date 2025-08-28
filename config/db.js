const mongoose = require('mongoose');
const env = require('dotenv').config();

module.exports = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log("MongoDB connected to:", conn.connection.host);
        console.log("Database name:", conn.connection.name);
        
        // Log when connection is established
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to db');
        });

        // Log any errors after initial connection
        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
};
