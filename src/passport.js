const passport = require('passport');
const { Strategy } = require('passport-discord');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,    
    callbackURL: process.env.REDIRECT_URL,
    scope: ["identify"]
}, (accestoken, refreshtoken, profile, cb) => {
    process.nextTick(() => {
        return cb(null, profile)
    });
}));

module.exports = passport;