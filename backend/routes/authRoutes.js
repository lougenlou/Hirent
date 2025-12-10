const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  registerUser,
  loginUser,
  updateProfile,
} = require("../controllers/authController");

// Configure multer for avatar uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit for avatars
});

// Get current logged-in user
router.get("/me", authMiddleware, (req, res) => {
  try {
    if (!req.user) return res.status(404).json({ msg: "User not found" });
    res.json({ user: req.user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});
// Google OAuth - owner signup
router.get(
  "/google/owner",
  (req, res, next) => {
    req.session.state = "owner";
    req.session.from = req.query.from || "/ownersignup";
    next();
  },
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    session: false,
  })
);

// Google OAuth - renter login/signup
router.get(
  "/google/renter",
  (req, res, next) => {
    req.session.state = "renter";
    req.session.from = req.query.from || "/";
    next();
  },
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    session: false,
  })
);
// -------------------------------
// GOOGLE CALLBACK
// -------------------------------
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/ownersignup",
  }),
  async (req, res) => {
    try {
      const { state, from } = req.session;
      const { googleId, name, email, avatar } = req.user;
      const normalizedEmail = email.toLowerCase().trim();

      // Find existing user
      let user = await User.findOne({
        $or: [{ googleId }, { email: normalizedEmail }],
      });

      // ---------- OWNER FLOW ----------
      if (state === "owner") {
        if (user) {
          if (user.role !== "owner") {
            // BLOCK renter → DO NOT proceed
            return res.redirect(
              `http://localhost:3000/ownersignup?error=${encodeURIComponent(
                "This Google account is registered as a renter. Cannot use it as owner."
              )}`
            );
          }
          // Existing owner → continue
        } else {
          // New account → DO NOT create owner automatically
          return res.redirect(
            `http://localhost:3000/ownersignup?error=${encodeURIComponent(
              "Cannot register new owner via Google. Use a pre-approved owner account."
            )}`
          );
        }
      }

      // ---------- RENTER FLOW ----------
      if (!user) {
        // Create renter account
        user = new User({
          googleId,
          email: normalizedEmail,
          name,
          avatar,
          role: "renter",
          authProvider: "google",
        });
        await user.save();
      } else {
        // Link Google ID if missing
        if (!user.googleId) user.googleId = googleId;
        if (avatar && !user.avatar) user.avatar = avatar;
        await user.save();
      }

      // ---------- GENERATE JWT ----------
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        authProvider: user.authProvider,
        ownerSetupCompleted: user.ownerSetupCompleted,
      };

      // Redirect to frontend callback
      return res.redirect(
        `http://localhost:3000/auth-callback?token=${token}&user=${encodeURIComponent(
          JSON.stringify(userResponse)
        )}&from=${encodeURIComponent(from)}`
      );
    } catch (err) {
      console.error("[GOOGLE CALLBACK] Error:", err);
      return res.redirect(
        `/ownersignup?error=${encodeURIComponent(
          "Google authentication failed: " + err.message
        )}`
      );
    }
  }
);

// Standard Auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// Profile management (requires authentication)
router.put("/profile", authMiddleware, upload.single("avatar"), updateProfile);

module.exports = router;
