const express = require('express');
const router = express.Router();
const Level = require('../../models/level');
const Challenge = require('../../models/challenge');

router.get('/levels', async(req, res) => {
    try {
        const levels = await retrieveLevels();
        const totalStarsUser = await Challenge.find(
            {'usersChallengeData.user': req.query.ID},
            {'usersChallengeData.$': 1}
        );
        
        const totalStarsAcquired = totalStarsUser.reduce((sum, a) => { 
            return sum + a.usersChallengeData[0].starsAcquired 
        }, 0);

        res.status(200).json({ levels, totalStarsAcquired });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

async function retrieveLevels() {
    return await Level.find();
}

module.exports = router;