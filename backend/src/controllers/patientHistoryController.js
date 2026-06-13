const getPatientHistory = async (req, res) => {
  try {
    const { patientId } = req.params;

    res.status(200).json({
      success: true,
      patientId,
      history: [],
      message: 'Patient history endpoint ready',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPatientHistory,
};