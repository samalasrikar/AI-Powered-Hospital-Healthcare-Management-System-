const getLabDashboard = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      dashboard: {
        totalTests: 0,
        pendingTests: 0,
        completedTests: 0,
      },
      message: 'Lab dashboard endpoint ready',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getLabDashboard,
};