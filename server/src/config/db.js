const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // In Mongoose v7+, we do NOT need to pass extra options like useNewUrlParser
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;