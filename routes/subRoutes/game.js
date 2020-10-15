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

router.get('/:difficulty', async(req, res) => {
    const userID = req.query.ID;

    try {
        const levelDifficulty = await Level.findOne({ difficulty: req.params.difficulty });
        const challenges = await Challenge.find({difficulty: levelDifficulty._id});
        const challengeUserStat = await Challenge.find({ 'difficulty': levelDifficulty._id, 'usersChallengeData.user' : userID }, {'usersChallengeData.$': 1});

        const arrayChallenges = new Array();
        for (let i = 0; i < challenges.length; i++) {
            arrayChallenges.push({ 
                IDChallenge: challengeUserStat[i]._id,
                IDUsersChallengeStats: challengeUserStat[i].usersChallengeData[0]._id,
                sentence: challenges[i].sentence, 
                maxTime: challenges[i].maxTime, 
                starsAcquired: challengeUserStat[i].usersChallengeData[0].starsAcquired, 
                isCompleted: challengeUserStat[i].usersChallengeData[0].isCompleted
            });
        }
        
        res.status(200).json({ arrayChallenges });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

async function retrieveLevels() {
    return await Level.find();
}

module.exports = router;