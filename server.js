require('./config/authentication');
const express = require('express');
const { connectToDatabase } = require('./config/database');
const cors = require('cors');
const passport = require('passport');
const mainAPIRoute = require('./routes/index');

//Initialize application
const app = express();

//Establish connection to database
connectToDatabase();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api', mainAPIRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));