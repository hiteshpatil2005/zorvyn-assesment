exports.checkRole = (...roles) => {
  return (req, res, next) => {
    const role = req.headers.role || req.headers.authorization?.split(' ')[1] || 'admin';

    if (!roles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: `Access Denied: Role '${role}' does not have permission. Required roles: ${roles.join(', ')}`
      });
    }

    next();
  };
};