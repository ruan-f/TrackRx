import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: "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", dangerouslyAllowBrowser: true});

export default function OurServices() {
  const [service, setService] = useState(""); // State for the service name input
  const [description, setDescription] = useState(""); // State for the service description
  const [loading, setLoading] = useState(false); // State for loading state
  const [error, setError] = useState(""); // State for error handling

  // Function to fetch description from Groq
  const fetchServiceDescription = async () => {
    setLoading(true); // Set loading state
    setDescription(""); // Clear previous description
    setError(""); // Clear previous errors

    try {
      // Actual API call to Groq
      const chatCompletion = await getGroqChatCompletion(service); // Pass the service name to Groq

      // Set the response description
      setDescription(chatCompletion || "No description available for this service.");
    } catch (error) {
      console.error("Error fetching service description:", error);
      setError("Error fetching service description.");
    }

    setLoading(false); // Set loading to false after completion
  };

  // Function that sends a message to Groq API and retrieves a response
  const getGroqChatCompletion = async (serviceName) => {
    try {
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Tell me about the service, reply in html format ${serviceName}`,
          },
        ],
        model: "llama-3.3-70b-versatile", // Replace with the model you're using
      });

      // Return the first message response content
      return response.choices[0]?.message?.content || null;
    } catch (error) {
      console.error("Error fetching chat completion:", error);
      throw new Error("Failed to fetch data from Groq.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Our Services</h1>

      {/* Input field for the user to enter a service name */}
      <Input
        placeholder="Enter service name"
        value={service}
        onChange={(e) => setService(e.target.value)} // Update the service state
        className="mb-2"
      />

      {/* Button to fetch the service description */}
      <Button onClick={fetchServiceDescription} disabled={loading}>
        {loading ? "Loading..." : "Get Service Info"}
      </Button>

      {/* Display the service description if available */}
      {description && (
        <Card className="mt-4">
          <CardContent>
            {/* Render HTML content safely */}
            <div
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Display error message if any */}
      {error && (
        <Card className="mt-4">
          <CardContent>
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
