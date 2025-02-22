import Groq from "groq-sdk";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Initialize Groq client
const client = new Groq({
  apiKey: "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", // Ensure API_KEY is properly set in your environment variables
  dangerouslyAllowBrowser: true,
});

export default function OurServices() {
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fetch service description
  const fetchServiceDescription = async () => {
    if (!service.trim()) {
      setError("Please enter a valid query.");
      return;
    }

    setLoading(true);
    setDescription("");
    setError("");

    try {
      const chatCompletion = await getGroqChatCompletion(service);
      setDescription(chatCompletion || "No description available for this service.");
    } catch (err) {
      setError("Error fetching service description.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Get Groq chat completion
  const getGroqChatCompletion = async (serviceName) => {
    try {
      const response = await client.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Help me with my medication, reply in HTML format, bolding headers ${serviceName}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });
      return response.choices[0]?.message?.content || "No response from the model.";
    } catch (err) {
      console.error("Failed to fetch data from Groq:", err);
      throw err;
    }
  };

  // Toggle menu state
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-6">
      <button
        onClick={toggleMenu}
        className="absolute top-4 right-4 p-2 bg-blue-600 text-white rounded-full"
      >
        &#9776;
      </button>

      {isMenuOpen && (
        <div className="absolute top-10 right-4 bg-white shadow-lg rounded-md p-4 w-48">
          <ul>
            <li>
              <a href="#/" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">
                Home
              </a>
            </li>
            <li>
              <a href="#/personal-info" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">
                Personal Info
              </a>
            </li>
            <li>
              <a href="#/AI-Assistant" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">
                AI Assistant
              </a>
            </li>
            <li>
              <a href="#/tracking" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">
                Tracking
              </a>
            </li>
          </ul>
        </div>
      )}

      <div className="p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">AI Assistant</h1>
        <p className="text-l font-bold mb-4 text-center">
          Nothing the AI says is medical advice. Always consult a doctor before taking any health-related actions.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <Input
            placeholder="Enter query"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="mb-2 w-full"
          />
          <Button onClick={fetchServiceDescription} disabled={loading} className="w-full">
            {loading ? "Loading..." : "Get Assistance"}
          </Button>
        </div>

        {description && (
          <Card className="mt-4 w-full bg-white shadow-lg p-4 rounded-lg mb-32">
            <CardContent>
              <div className="text-lg" dangerouslySetInnerHTML={{ __html: description }} />
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="mt-4 w-full bg-red-100 shadow-lg p-4 rounded-lg">
            <CardContent>
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <footer className="absolute bottom-8 mt-128 text-center text-gray-500 mb-8">
        <p>&copy; {new Date().getFullYear()} TrackRx. All rights reserved.</p>
      </footer>

    </div>
  );
}