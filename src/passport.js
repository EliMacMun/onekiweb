import passport from 'passport'
import Strategy from 'passport-discord'
import { config } from 'dotenv'
config()

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(new Strategy({
    clientID: BigInt(process.env.CLIENT_ID, 10),
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URL,
    scope: ['identify', 'email', 'guilds'],
    // authorizationURL: 'https://discordapp.com/api/oauth2/authorize',
    // clientID: process.env.CLIENT_ID,
    // clientSecret: process.env.CLIENT_SECRET,    
    // callbackURL: process.env.REDIRECT_URL,
    // scope: ["identify"]
}, (accesToken, refreshToken, profile, cb) => {
    process.nextTick(() => {
        return cb(null, profile)
    });
}));

export default passport
