/**
 * Middleware to check if the user has required roles
 * @param {string[]} roles - array of allowed roles, e.g., ['admin', 'manager']
 */
exports.hasRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });

    const userRoles = Array.isArray(req.user.roles)
      ? req.user.roles
      : [req.user.role]; // normalize single role into array

    const hasPermission = roles.some(role => userRoles.includes(role));

    if (!hasPermission) {
      return res.status(403).json({ message: "You do not have permission to perform this action" });
    }

    next();
  };
};

// Shortcut for admin-only routes
exports.isAdmin = exports.hasRole(['admin']);

// checks if the currently logged-in user has administrative privileges before allowing them to access certain routes.