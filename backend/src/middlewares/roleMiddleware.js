const roleHierarchy = {
  SuperAdmin: 9,
  HospitalAdmin: 8,
  Doctor: 7,
  Nurse: 6,
  Receptionist: 5,
  LabTechnician: 4,
  Pharmacist: 3,
  BillingExecutive: 2,
  Patient: 1,
};

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    const userRole = req.user.role;

    // SuperAdmin bypasses role checks
    if (userRole === 'SuperAdmin') {
      return next();
    }

    // If no allowed roles were provided, allow authenticated users
    if (allowedRoles.length === 0) {
      return next();
    }

    if (allowedRoles.includes(userRole)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: 'Access denied',
    });
  };
};

// Authorize users who have at least the given role in the hierarchy
const authorizeAtLeast = (minRole) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    const userRole = req.user.role;

    // SuperAdmin always allowed
    if (userRole === 'SuperAdmin') {
      return next();
    }

    const userLevel = roleHierarchy[userRole] || 0;
    const minLevel = roleHierarchy[minRole] || 0;

    if (userLevel >= minLevel && minLevel > 0) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: 'Access denied',
    });
  };
};

module.exports = authorizeRoles;
module.exports.authorizeAtLeast = authorizeAtLeast;
module.exports.roleHierarchy = roleHierarchy;