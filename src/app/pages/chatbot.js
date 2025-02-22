// pages/api/chatbot-service.js

import Groq from "groq";
import { config } from "dotenv";

// Load environment variables
config();

const groqClient = new Groq({
  api_key: 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, // Use the GROQ_API_KEY environment variable
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { service } = req.body;

    if (!service) {
      return res.status(400).json({ error: "Service name is required" });
    }

    try {
      // Setting up the chat history
      const systemPrompt = {
        role: "system",
        content: "You are a helpful assistant. You reply with very short answers.",
      };

      const chatHistory = [systemPrompt, { role: "user", content: service }];

      const response = await groqClient.chat.completions.create({
        model: "llama3-8b-8192", // Chatbot model to use
        messages: chatHistory,
        max_tokens: 100,
        temperature: 1.2,
      });

      // Extract the description from the response
      const assistantResponse = response.choices[0].message.content;

      return res.status(200).json({ description: assistantResponse });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error fetching chatbot response." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
