const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');


const verifyCallback = async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false);

        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) return done(null, false);

        return done(null, user);
    } catch(err) {
        return done(err)
    }
};

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);


passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (ID, done) => {
    try {
        const user = await User.findById(ID);
        done(null, user)
    } catch {
        done(err)
    }
});
