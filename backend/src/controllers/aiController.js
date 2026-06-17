const aiService = require('../services/aiService');

const checkAIHealth = async (req, res, next) => {
  try {
    const result = await aiService.healthCheck();

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkAIHealth
};