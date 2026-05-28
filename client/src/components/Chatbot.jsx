import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, CornerDownLeft } from 'lucide-react';
import { resumeData } from '../../../server/data/resumeData.js'; // client-side fallback

const Chatbot = ({ serverUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi! I am Ganeshbabu's AI Assistant. Ask me anything about his 12+ years of experience, React.js frontend work, Azure DevOps skills, or how to contact him!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const chatEndRef = useRef(null);

  // Generate unique session ID on mount
  useEffect(() => {
    setSessionId(`sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const suggestionChips = [
    { label: "Core Skills?", query: "Tell me about your frontend and DevOps skills" },
    { label: "Experience?", query: "Describe your professional experience" },
    { label: "Certifications?", query: "Do you have any certifications?" },
    { label: "Contact Info?", query: "How can I contact you?" }
  ];

  // Local client-side matching fallback in case backend is offline
  const getLocalResponse = (query) => {
    const message = query.toLowerCase().trim();
    let bestMatch = null;
    let maxScore = 0;

    for (const qa of resumeData.chatbotQA) {
      let score = 0;
      for (const keyword of qa.keywords) {
        if (message.includes(keyword)) {
          score += keyword.length;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = qa;
      }
    }

    if (maxScore > 0 && bestMatch) {
      return bestMatch.answer;
    }

    const skillMatch = resumeData.skills.find(s => 
      message.includes(s.category.toLowerCase()) || 
      s.items.some(item => message.includes(item.toLowerCase()))
    );
    
    if (skillMatch) {
      return `Yes! Ganeshbabu has experience in **${skillMatch.category}**, including: ${skillMatch.items.join(', ')}.`;
    }

    return "I'm not sure about that specific detail, but I can tell you about Ganeshbabu's React experience, Azure DevOps background, certifications, education, or how to contact him! Feel free to ask one of those or check the UI.";
  };

  const handleSend = async (textToSend) => {
    const query = textToSend.trim();
    if (!query) return;

    // Append user message
    const userMsg = { sender: 'user', text: query, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Simulate typing delay for realistic interaction
    setTimeout(async () => {
      try {
        const response = await fetch(`${serverUrl}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: query, sessionId })
        });

        const data = await response.json();
        
        setMessages((prev) => [
          ...prev, 
          { sender: 'bot', text: data.text, timestamp: new Date() }
        ]);
      } catch (error) {
        console.warn('Backend chat API offline. Using client-side NLP fallback.', error);
        
        // Execute client-side response matching
        const localAnswer = getLocalResponse(query);
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: localAnswer, timestamp: new Date() }
        ]);
      } finally {
        setTyping(false);
      }
    }, 800); // 800ms delay feels natural
  };

  return (
    <div className="chatbot-widget">
      {/* Floating Toggle Button */}
      <button 
        className={`chat-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat assistant"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
        {!isOpen && <span className="chat-badge">AI</span>}
      </button>

      {/* Chat Window Panel */}
      <div className={`chat-panel glass-card ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="bot-info">
            <div className="bot-avatar">
              <Bot size={18} />
            </div>
            <div>
              <h4 className="bot-name">Antigravity Bot</h4>
              <span className="bot-status">Online Assistant</span>
            </div>
          </div>
          <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Message Window */}
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-row ${msg.sender}`}>
              <div className="message-avatar">
                {msg.sender === 'bot' ? <Bot size={14} /> : <User size={14} />}
              </div>
              <div className="message-bubble">
                <p className="message-text">{msg.text}</p>
                <span className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {typing && (
            <div className="message-row bot typing">
              <div className="message-avatar">
                <Bot size={14} />
              </div>
              <div className="message-bubble typing-bubble">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="chat-suggestions">
          {suggestionChips.map((chip, idx) => (
            <button 
              key={idx} 
              className="suggestion-chip"
              onClick={() => handleSend(chip.query)}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="chat-input-bar">
          <input
            type="text"
            placeholder="Ask me a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend(input);
            }}
          />
          <button 
            className="send-btn"
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .chatbot-widget {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
          font-family: var(--font-body);
        }

        .chat-toggle-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px var(--glow-color);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }

        .chat-toggle-btn:hover {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 6px 25px var(--glow-color);
        }

        .chat-toggle-btn.active {
          transform: rotate(90deg);
        }

        .chat-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background: #ef4444;
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.15rem 0.4rem;
          border-radius: 10px;
          border: 2px solid var(--bg-gradient);
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        .chat-panel {
          position: absolute;
          bottom: 75px;
          right: 0;
          width: 380px;
          height: 520px;
          display: flex;
          flex-direction: column;
          padding: 0;
          border: 1px solid var(--card-border);
          transform: scale(0.9) translateY(20px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          transform-origin: bottom right;
          overflow: hidden;
        }

        .chat-panel.open {
          transform: scale(1) translateY(0);
          opacity: 1;
          pointer-events: all;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .bot-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .bot-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--accent-color);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px var(--glow-color);
        }

        .bot-name {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .bot-status {
          font-size: 0.7rem;
          color: #10b981;
          font-weight: 500;
          display: block;
        }

        .chat-close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          opacity: 0.7;
          transition: all 0.2s ease;
        }

        .chat-close-btn:hover {
          color: var(--text-primary);
          opacity: 1;
        }

        .chat-messages {
          flex: 1;
          padding: 1.25rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .message-row {
          display: flex;
          gap: 0.6rem;
          max-width: 85%;
        }

        .message-row.bot {
          align-self: flex-start;
        }

        .message-row.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .message-row.user .message-avatar {
          background: var(--accent-color);
          border-color: var(--accent-color);
          color: #fff;
        }

        .message-bubble {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 0.75rem 0.95rem;
          border-radius: 14px;
          border-top-left-radius: 2px;
          position: relative;
        }

        .message-row.user .message-bubble {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          border-top-right-radius: 2px;
        }

        .message-text {
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--text-primary);
          white-space: pre-wrap;
        }

        /* Support simple markdown bold inside chat bubbles */
        .message-text strong {
          color: var(--accent-color);
          font-weight: 600;
        }

        .message-time {
          font-size: 0.65rem;
          color: var(--text-secondary);
          display: block;
          margin-top: 0.25rem;
          text-align: right;
          opacity: 0.8;
        }

        /* Typing indicator dots */
        .typing-bubble {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.6rem 0.8rem;
        }

        .typing-bubble .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-secondary);
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .typing-bubble .dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-bubble .dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        .chat-suggestions {
          display: flex;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          overflow-x: auto;
          flex-shrink: 0;
          scrollbar-width: none; /* Hide scrollbar for chips */
        }
        .chat-suggestions::-webkit-scrollbar {
          display: none;
        }

        .suggestion-chip {
          white-space: nowrap;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          padding: 0.35rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .suggestion-chip:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: var(--accent-color);
          color: var(--text-primary);
        }

        .chat-input-bar {
          display: flex;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.15);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          gap: 0.5rem;
          align-items: center;
        }

        .chat-input-bar input {
          flex: 1;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 0.6rem 0.85rem;
          color: var(--text-primary);
          font-size: 0.85rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .chat-input-bar input:focus {
          border-color: var(--accent-color);
          background: rgba(255, 255, 255, 0.07);
        }

        .send-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--accent-color);
          color: #fff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 10px var(--glow-color);
          transition: all 0.3s ease;
        }

        .send-btn:hover {
          background: var(--accent-secondary);
          transform: translateY(-1px);
        }

        .send-btn:disabled {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.2);
          box-shadow: none;
          cursor: not-allowed;
        }

        @media (max-width: 576px) {
          .chat-panel {
            width: calc(100vw - 40px);
            height: calc(100vh - 120px);
            right: 0px;
            bottom: 70px;
          }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
