const searchRecords = async (req, res) => {
  try {
    const { patientId, documentType } = req.query;

    res.status(200).json({
      success: true,
      filters: {
        patientId,
        documentType,
      },
      message: 'EMR search endpoint ready',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  searchRecords,
};