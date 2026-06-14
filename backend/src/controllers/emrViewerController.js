const viewMedicalRecord = async (req, res) => {
  try {
    const { recordId } = req.params;

    res.status(200).json({
      success: true,
      recordId,
      medicalRecord: {},
      message: 'EMR viewer endpoint ready',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  viewMedicalRecord,
};