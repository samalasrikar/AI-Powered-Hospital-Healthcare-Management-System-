const ActivityLog = require("../models/ActivityLog");

const logActivity = async ({
  userId,
  action,
  module,
  ipAddress,
  metadata = {},
}) => {
  try {
    await ActivityLog.create({
      userId,
      action,
      module,
      ipAddress,
      metadata,
    });
  } catch (error) {
    console.error("Audit Log Error:", error.message);
  }
};

module.exports = logActivity;