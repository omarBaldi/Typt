const mongoose = require('mongoose');
const levelsSchema = new mongoose.Schema({
    difficulty: {
        type: String,
        required: true,
    },
    starsToUnlock: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Level', levelsSchema);