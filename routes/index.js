const express = require('express');
const router = express.Router();
const authRoute = require('./subRoutes/auth');
const gameRoute = require('./subRoutes/game');

router.use('/auth', authRoute);
router.use('/game', gameRoute);

module.exports = router;