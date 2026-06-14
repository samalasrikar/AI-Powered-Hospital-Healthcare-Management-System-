const logActivity = require("../utils/activityLogger");

const auditLogger = (action, module) => {
  return async (req, res, next) => {
    const originalJson = res.json;
    res.json = async function (body) {
      if (body?.success && req.user) {
        try {

          await logActivity({
            userId: req.user.userId,
            action,
            module,
            ipAddress: req.ip,
            metadata: {
              method: req.method,
              route: req.originalUrl,
            },
          });

          console.log("AUDIT LOG SAVED");
        } catch (err) {
          console.error("AUDIT LOGGER ERROR:", err);
        }
      }

      return originalJson.call(this, body);
    };

    next();
  };
};

module.exports = auditLogger;
