import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiPaperAirplane, HiRefresh, HiSparkles } from 'react-icons/hi';
import { aiService } from '../services/aiService';
import { chatbotConfig, validateApiKey } from '../config/chatbot.config';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: chatbotConfig.settings.welcomeMessage,
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen]);

  // Handle send message
  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    // Check API key
    if (!validateApiKey()) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `⚠️ AI API is not configured yet. Please add your ${chatbotConfig.provider.toUpperCase()} API key in the chatbot configuration file.\n\nThis is a demo chatbot component that showcases Godlycode's ability to integrate AI into web applications. Once configured with a valid API key, it will provide intelligent responses powered by ${chatbotConfig.provider === 'claude' ? 'Claude AI' : 'Venice AI'}.`,
          timestamp: new Date()
        }
      ]);
      setIsLoading(false);
      return;
    }

    try {
      setIsTyping(true);
      const response = await aiService.sendMessage(messageText);

      // Simulate typing effect
      await new Promise(resolve => setTimeout(resolve, 300));

      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: response,
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setError(err.message);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `❌ Oops! Something went wrong: ${err.message}\n\nPlease check your API key configuration and try again.`,
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  // Handle suggested question
  const handleSuggestedQuestion = (question) => {
    setInputValue(question);
    handleSendMessage(question);
  };

  // Handle reset conversation
  const handleReset = () => {
    aiService.clearHistory();
    setMessages([
      {
        role: 'assistant',
        content: chatbotConfig.settings.welcomeMessage,
        timestamp: new Date()
      }
    ]);
    setError(null);
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-celestial-gold to-electric-blue shadow-2xl flex items-center justify-center cursor-pointer group interactive"
            style={{
              boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)'
            }}
          >
            {/* Pulse Animation */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 rounded-full bg-celestial-gold"
            />

            {/* Sparkle Icon */}
            <HiSparkles className="text-3xl text-dark-bg relative z-10 group-hover:rotate-12 transition-transform" />

            {/* Notification Badge */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-bg"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] glass rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-celestial-gold/30"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-celestial-gold to-electric-blue p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="text-3xl"
                >
                  {chatbotConfig.ui.chatbotAvatar}
                </motion.div>
                <div>
                  <h3 className="text-dark-bg font-bold text-lg">
                    {chatbotConfig.ui.chatbotName}
                  </h3>
                  <p className="text-dark-bg/70 text-xs">
                    Powered by {chatbotConfig.provider === 'claude' ? 'Claude AI' : 'Venice AI'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleReset}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Reset conversation"
                >
                  <HiRefresh className="text-xl text-dark-bg" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <HiX className="text-xl text-dark-bg" />
                </motion.button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-secondary/50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.role === 'user'
                        ? 'bg-celestial-gold text-dark-bg'
                        : 'glass text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    <p className="text-xs opacity-50 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="glass rounded-2xl p-3">
                    <div className="flex space-x-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -10, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                          className="w-2 h-2 bg-celestial-gold rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && !isLoading && (
              <div className="p-3 bg-dark-tertiary/50 border-t border-gray-700">
                <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {chatbotConfig.suggestedQuestions.slice(0, 3).map((question, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs px-3 py-1.5 glass rounded-full text-celestial-gold border border-celestial-gold/30 hover:bg-celestial-gold/10 transition-all"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-dark-tertiary border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  placeholder={chatbotConfig.settings.placeholder}
                  className="flex-1 bg-dark-secondary text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-celestial-gold text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-celestial-gold text-dark-bg p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed interactive"
                >
                  <HiPaperAirplane className="text-xl" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
