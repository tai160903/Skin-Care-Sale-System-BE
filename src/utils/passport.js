const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // google client id
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // google client secret
      callbackURL: "http://localhost:8080/api/auth/google/callback",
    },

    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          // Create a new user without a password for Google-authenticated users
          await User.create({
            email: profile.emails[0].value,
            name: profile.displayName,
            password: profile.emails[0].value, // Set an empty password or remove it
          });
        }
        done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
