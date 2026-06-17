import { useState } from "react";
import "./App.css";

function App() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [prescription, setPrescription] = useState(
    "Paracetamol 500mg twice daily"
  );

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! Ask me anything about your prescription.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = message;
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/prescription-bot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prescription,
            question: currentQuestion,
          }),
        }
      );

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            data.explanation ||
            data.response ||
            "No response received.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Unable to connect to server.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Prescription Chat Assistant</h1>

      <div className="context-box">
        <h3>Prescription Context</h3>

        <textarea
          rows="4"
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
        />
      </div>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender}`}
          >
            <strong>
              {msg.sender === "user" ? "You" : "Assistant"}:
            </strong>{" "}
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="message bot">
            Assistant is typing...
          </div>
        )}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Ask about your prescription..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;