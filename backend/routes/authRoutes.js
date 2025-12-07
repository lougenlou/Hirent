require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {
  registerUser,
  loginUser,
  googleLogin,
} = require("../controllers/authController");

//Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userData = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          avatar: profile.photos?.[0]?.value,
        };

        return done(null, userData);
        } catch (error) {
        return done(error, null);
      }
    }
  ) 
);

// Google OAuth Routes
    router.get(
      "/google",
      passport.authenticate("google", { session: false }),
      (req, res) => {
        const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.redirect(`http://localhost:3000?token=${token}`);
      }
    );
    
// Standard Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);


module.exports = router;
