const getRevenueAnalytics = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      dailyRevenue: 25000,
      weeklyRevenue: 175000,
      monthlyRevenue: 750000,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRevenueAnalytics,
};