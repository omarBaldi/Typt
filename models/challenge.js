const mongoose = require('mongoose');
const challengeSchema = new mongoose.Schema({
    sentence: {
        type: String,
        required: true
    },
    maxTime: {
        type: Number,
        required: true
    },
    difficulty: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Level', 
        required: true 
    },
    usersChallengeData: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            starsAcquired: { type: Number, required: true },
            isCompleted: { type: Boolean, required: true }
        }
    ]
});

module.exports = mongoose.model('Challenge', challengeSchema);