require('dotenv').config();
const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DB_URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("Connected to the database");
    } catch(err) {
        console.log(`Failed at connecting to the database: ${err.message}`);
    }
};

module.exports = { connectToDatabase };