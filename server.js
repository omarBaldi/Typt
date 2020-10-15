const path = require('path');
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

//Production deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));