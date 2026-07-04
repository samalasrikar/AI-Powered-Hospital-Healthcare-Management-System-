const viewLabReport = async (req, res) => {
  try {
    const { reportId } = req.params;

    res.status(200).json({
      success: true,
      reportId,
      report: {},
      message: 'Lab report viewer endpoint ready',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  viewLabReport,
};