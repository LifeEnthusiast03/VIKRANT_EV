import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Loader2, AlertCircle } from 'lucide-react';

const ElectricBikeChatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m here to help you learn about our electric bikes. Ask me anything about our models, features, pricing, or maintenance!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');
    setError(null);
    
    // Add user message to chat
    const newMessages = [...chatMessages, { type: 'user', text: userMessage }];
    setChatMessages(newMessages);
    setIsTyping(true);

    try {
      // Call backend API
      const response = await fetch('https://haquenichbackend.vercel.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: newMessages.slice(-10) 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setIsTyping(false);
      setChatMessages(prev => [...prev, { type: 'bot', text: data.response }]);
      
    } catch (err) {
      setIsTyping(false);
      setError('Sorry, I\'m having trouble connecting. Please try again.');
      console.error('Chat API Error:', err);
      
      // Add error message to chat
      setChatMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'Sorry, I\'m having trouble connecting right now. Please try again in a moment.' 
      }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  const clearChat = () => {
    setChatMessages([
      { type: 'bot', text: 'Hello! I\'m here to help you learn about our electric bikes. Ask me anything about our models, features, pricing, or maintenance!' }
    ]);
    setError(null);
  };

  return (
    <div className="fixed bottom-0 right-0 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setChatOpen(true)}
        className={`fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 ${
          chatOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-gray-800 border border-gray-700 rounded-xl shadow-2xl flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle size={20} />
              <span className="font-semibold">ElectricBike Assistant</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearChat}
                className="hover:bg-white/20 p-1 rounded text-sm"
                title="Clear chat"
              >
                Clear
              </button>
              <button
                onClick={() => setChatOpen(false)}
                className="hover:bg-white/20 p-1 rounded"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-red-600 text-white p-2 flex items-center space-x-2">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.text}</div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 px-3 py-2 rounded-lg flex items-center space-x-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about our electric bikes..."
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400 resize-none"
                rows="1"
                style={{ minHeight: '40px', maxHeight: '100px' }}
              />
              <button
                onClick={sendChatMessage}
                disabled={isTyping || !chatInput.trim()}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectricBikeChatbot;