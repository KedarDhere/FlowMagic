const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CLIENT_URL,
  scope:["profile", "email"]
}, function (accessToken, refreshToke, profile, callback) {
    callback(null, profile)
}
))

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user.id);
  });