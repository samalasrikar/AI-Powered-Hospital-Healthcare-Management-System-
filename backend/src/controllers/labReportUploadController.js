const uploadLabReport = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Lab report upload endpoint ready',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadLabReport,
};