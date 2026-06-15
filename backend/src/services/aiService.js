const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class AIService {
  async healthCheck() {
    return {
      status: "active",
      service: "AI Service Layer",
      provider: "Google Gemini",
      timestamp: new Date(),
    };
  }

  async generateResponse(prompt) {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      throw new Error(`AI Service Error: ${error.message}`);
    }
  }
}

module.exports = new AIService();