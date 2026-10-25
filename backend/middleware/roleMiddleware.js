/**
 * Role-based authorization middleware
 * @param  {...string} roles - Permitted roles (e.g. 'admin', 'student')
 */
export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access restricted to roles [${roles.join(', ')}]. Your role is '${req.user.role}'.`
      });
    }

    next();
  };
};

export default requireRole;
