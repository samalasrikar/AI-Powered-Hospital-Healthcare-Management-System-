const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

class AIService {
  async healthCheck() {
    return {
      status: "active",
      service: "AI Service Layer",
      provider: "Groq",
      timestamp: new Date(),
    };
  }

  async generateResponse(prompt) {
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama-3.1-8b-instant",
      });

      return completion.choices[0].message.content;
    } catch (error) {
      throw new Error(`AI Service Error: ${error.message}`);
    }
  }
}

module.exports = new AIService();