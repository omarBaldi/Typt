const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports =  {

    allFieldsFilled(...args) {
        for (let arg of args) {
            if (!arg) return false
        }
        return true
    },
    
    passwordsEqual(password, password2) {
        return password === password2
    },
    
    async userAlreadyRegistered(username) {
        const userFound = await User.findOne({ username });
        if (userFound) return true
        return false
    },
    
    async hashing(password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword
    }

};