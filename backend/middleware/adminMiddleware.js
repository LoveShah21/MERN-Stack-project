const adminMiddleware = (req, res, next) => {
    // Check if the user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  
    // If the user is an admin, proceed to the next middleware or controller
    next();
  };
  
  module.exports = adminMiddleware;