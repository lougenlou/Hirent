const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res
          .status(401)
          .json({ message: "User not found, authorization denied" });
      }

      req.user = user; // now req.user.id, req.user.role, etc. are accessible
      return next();
    } catch (err) {
      console.error("Auth middleware error:", err.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }
};

module.exports = { protect };
