"use client"; // Ensure the file is treated as a client-side component

import React, { useState } from "react";

// Define the Chatbot component (no sidebar toggle)
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  async function handleSendMessage() {
    if (userInput.trim()) {
      try {
        const response = await fetch('https://your-api-endpoint.com/chatbox', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_input: userInput }),
        });

        const jsonResponse = await response.json();

        if (response.ok) {
          setMessages([
            ...messages,
            { text: userInput, sender: "user" },
            { text: jsonResponse.response, sender: "bot" }
          ]);
        } else {
          console.error("Error in response:", jsonResponse);
        }

      } catch (error) {
        alert('Error', 'Something went wrong');
        console.error(error);
      }

      // Clear the input field after sending
      setUserInput('');
    }
  };

  return (
    <div
      style={{
        position: "fixed", // Make it stick on the screen
        right: "10px", // Align to the right
        bottom: "10px", // Align to the bottom
        backgroundColor: "white", // Background color for the chat
        border: "1px solid #ccc", // Border around the chat container
        padding: "10px", // Padding inside chat area
        paddingTop: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow for 3D effect
        zIndex: 1000, // Ensure it stays on top of other elements
        borderRadius: "8px", // Rounded corners
        width: "300px", // Fixed width
        height: "400px", // Fixed height
        display: "flex",
        flexDirection: "column", // Layout for messages and input field
        justifyContent: "space-between",
      }}
    >
      {/* Chat messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto", // Enable scrolling if content overflows
          backgroundColor: "#f9f9f9", // Chatbox background
          borderRadius: "8px", // Rounded corners
          padding: "10px", // Padding inside the chat
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Shadow for the content area
          marginBottom: "10px", // Margin between chat and input box
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Chatbot</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px", // Space between messages
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                backgroundColor: message.sender === "user" ? "#EC4899" : "#e4e4e4",
                padding: "8px", // Padding inside the message bubble
                borderRadius: "5px", // Rounded corners for the message
                color: message.sender === "user" ? "white" : "black", // Text color
                alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>

      {/* Input field and send button */}
      <div
        style={{
          display: "flex",
          gap: "10px", // Space between input and button
          marginTop: "auto", // Push input to the bottom of the chatbox
        }}
      >
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1, // Make input box take available space
            padding: "8px", // Padding inside input box
            borderRadius: "5px", // Rounded input box
            border: "1px solid #ccc", // Border around input box
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            backgroundColor: "#EC4899", // Send button background color
            color: "white", // Button text color
            border: "none", // No border
            padding: "8px 12px", // Padding inside the button
            borderRadius: "5px", // Rounded button
            cursor: "pointer", // Pointer cursor for button click
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
