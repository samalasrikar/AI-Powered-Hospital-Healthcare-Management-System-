const aiService = require('../services/aiService');

const explainPrescription = async (req, res, next) => {
  try {
    const { prescription } = req.body;

    if (!prescription) {
      return res.status(400).json({
        success: false,
        message: 'Prescription is required',
      });
    }

    const prompt = `
Explain the following prescription in simple language.

Prescription:
${prescription}

Provide:
1. Simple explanation
2. Dosage instructions
3. Usage guidance

Keep the response patient-friendly and easy to understand.
`;

    const explanation = await aiService.generateResponse(prompt);

    res.status(200).json({
      success: true,
      explanation,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  explainPrescription,
};