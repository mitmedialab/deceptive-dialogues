import React, { useState } from 'react';
import { callOpenAI } from './OpenAI'; // Import your openai.js function
import './App.css';

// Start message
const startMessage = "Do you think this image true or false?";


function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{role:"assistant", content:startMessage}]);

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { role: "user", content: input };
      setMessages([...messages, userMessage]);

      console.log("Messages before: ", [...messages, userMessage]);
      
      const response = await callOpenAI([...messages, userMessage]);
      const botMessage = { role: "assistant", content: response };
      setMessages([...messages, userMessage, botMessage]);
      
      setInput('');
    }
  };

  // Handle keydown event
  const handleKeyDown = (event) => {
    console.log("ajdoasjdoiajsoij")
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      {/*<div className="chat-header">
        <span className="back-arrow">←</span>
        <span className="title">AI Chat</span>
      </div>*/}
      <div className="image-container">
        <img src="testImage.png"></img>
        <span class="image-caption"><i>This is a test image.</i></span>
      </div>
      <div className="chat-body">
        {messages
          .filter((msg) => msg.role !== 'system') // Exclude system messages
          .map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <div className="chat-avatar">
              {msg.role === 'assistant' && (
                <span className="material-icons">smart_toy</span>
              )}
              </div>
              <div className="chat-content">
                <span>{msg.content}</span>
              </div>
            </div>
        ))}
      </div>
      
      <div className="chat-footer">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={handleKeyDown}
          placeholder="Write your message." 
        />
        <button onClick={sendMessage} className="send-button">➤</button>
      </div>
    </div>
  );
}

export default App;