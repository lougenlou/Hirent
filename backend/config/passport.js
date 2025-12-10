const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");

dotenv.config();

// ==============================
// Passport Google OAuth Strategy
// ==============================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_REDIRECT_URI || "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract relevant user data from Google profile
        const userData = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          avatar: profile.photos?.[0]?.value,
        };

        // Pass user data to your backend controller for DB operations
        // Do NOT modify roles here; handle that in your route/controller
        return done(null, userData);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// ==============================
// Session Handling (optional)
// ==============================
passport.serializeUser((user, done) => {
  // Stores user info in session (if using session-based auth)
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  // Retrieves user info from session
  done(null, obj);
});

module.exports = passport;
