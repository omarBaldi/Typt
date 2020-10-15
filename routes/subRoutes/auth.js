const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/user');
const Challenge = require('../../models/challenge');
const { allFieldsFilled, passwordsEqual, userAlreadyRegistered, hashing } = require('../../utils/functions');


router.post('/login', passport.authenticate('local'), (req, res) => {
    if (req.user) {
        return res.status(200).json({message: 'You can now login', currentUser: req.user });
    }
});

router.post('/register', async(req, res) => {
    const { name, username, password, password2 } = req.body;

    if (!allFieldsFilled(name, username, password, password2)) {
        return res.status(400).json({ message: 'All the fields need to be required' });
    }

    if (!passwordsEqual(password, password2)) {
        return res.status(400).json({ message: 'Passwords are different' });
    }

    if (await userAlreadyRegistered(username)) {
        return res.status(400).json({ message: 'You have already registered' });
    }


    const hashedPassword = await hashing(password);
    const user = new User({ name, username, password: hashedPassword });

    try {
        await initializeUserLevels(user._id); 
        await user.save();
        console.log("save user")
        res.status(201).json({ message: 'User successfully created' });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }

});

router.get('/logout', (req, res) => {
    req.logout();
    return res.status(200).json({ message: 'Successfully logged out' });
});


async function initializeUserLevels(ID) {
    const obj = { user: ID, starsAcquired: 0, isCompleted: false };
    await Challenge.updateMany({}, { $push: { usersChallengeData :obj } });
};

module.exports = router;
