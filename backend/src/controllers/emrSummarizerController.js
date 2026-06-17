const aiService = require('../services/aiService');

const summarizeMedicalRecord = async (req, res, next) => {
  try {
    const { medicalRecord } = req.body;

    if (!medicalRecord) {
      return res.status(400).json({
        success: false,
        message: 'Medical record is required',
      });
    }

    const prompt = `
Summarize the following medical record in concise bullet points.

Medical Record:
${medicalRecord}

Return:
- Chronic Conditions
- Surgeries
- Allergies
- Important Notes

Keep the summary short and easy to read.
`;

    const summary = await aiService.generateResponse(prompt);

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  summarizeMedicalRecord,
};