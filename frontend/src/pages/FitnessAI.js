import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./FitnessAI.css"; // See below for CSS

const WELCOME_MSG = "Hi! I'm your Fitness AI bot. Ask me anything about workouts, nutrition, or training. If your question isn't fitness-related, I'll let you know!";

export default function FitnessAI() {
  const [messages, setMessages] = useState([
    { from: "ai", text: WELCOME_MSG }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages(msgs => [...msgs, { from: "user", text: userMessage }]);
    setInput("");
    setLoading(true);
    try {
      // You need to replace this endpoint with your backend implementation!
      const res = await axios.post("/api/fitness-bot", { message: userMessage });
      setMessages(msgs => [...msgs, { from: "ai", text: res.data.reply }]);
    } catch (e) {
      setMessages(msgs => [...msgs, { from: "ai", text: "Sorry, there was an error." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fitnessai-chat-root">
      <div className="fitnessai-header">
        <span role="img" aria-label="AI Bot" className="fitnessai-bot-emoji">🤖</span>
        <span className="fitnessai-title">Fitness AI Chat</span>
      </div>
      <div className="fitnessai-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`fitnessai-msg ${msg.from}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="fitnessai-msg ai">AI is typing...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="fitnessai-input-row">
        <input
          className="fitnessai-input"
          value={input}
          autoFocus
          placeholder="Ask your fitness question..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <button
          className="fitnessai-send-btn"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}