const getExpiryTracking = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      expiryItems: [],
      message: 'Expiry tracking endpoint ready',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getExpiryTracking,
};