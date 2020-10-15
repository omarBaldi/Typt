const express = require('express');
const { connectToDatabase } = require('./config/database');

//Initialize application
const app = express();

//Establish connection to database
connectToDatabase();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));