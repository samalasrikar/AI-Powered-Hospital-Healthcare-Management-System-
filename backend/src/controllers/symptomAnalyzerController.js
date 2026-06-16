const aiService = require('../services/aiService');

const analyzeSymptoms = async (req, res, next) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({
        success: false,
        message: 'Symptoms are required',
      });
    }

    const prompt = `
You are a hospital symptom analyzer.

Patient symptoms:
${symptoms}

Return:
1. Possible Conditions
2. Recommended Department
3. Urgency Level (Low/Medium/High)

Add this disclaimer:
"This is not a medical diagnosis."
`;

    const response = await aiService.generateResponse(prompt);

    res.status(200).json({
      success: true,
      analysis: response,
      disclaimer: 'This is not a medical diagnosis.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeSymptoms,
};