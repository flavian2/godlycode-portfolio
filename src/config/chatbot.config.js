/**
 * AI Chatbot Configuration
 *
 * SETUP INSTRUCTIONS:
 * 1. Choose your AI provider: 'claude' or 'venice'
 * 2. Add your API key below
 * 3. Customize the chatbot personality and behavior
 *
 * FOR CLAUDE AI:
 * - Get API key from: https://console.anthropic.com/
 * - Set provider to 'claude'
 * - Add your API key to CLAUDE_API_KEY
 *
 * FOR VENICE AI:
 * - Get API key from: https://venice.ai/
 * - Set provider to 'venice'
 * - Add your API key to VENICE_API_KEY
 */

export const chatbotConfig = {
  // AI Provider: 'claude' or 'venice'
  provider: 'claude', // TODO: Change to 'venice' if using Venice AI

  // API Keys - ADD YOUR KEYS HERE
  apiKeys: {
    claude: '', // TODO: Add your Claude API key here (starts with 'sk-ant-')
    venice: ''  // TODO: Add your Venice API key here
  },

  // API Endpoints
  apiEndpoints: {
    claude: 'https://api.anthropic.com/v1/messages',
    venice: 'https://api.venice.ai/api/v1/chat/completions' // Adjust if Venice uses different endpoint
  },

  // Model Configuration
  models: {
    claude: 'claude-3-5-sonnet-20241022', // Claude 3.5 Sonnet
    venice: 'gpt-4' // Adjust based on Venice AI's available models
  },

  // Chatbot Personality & System Prompt
  systemPrompt: `You are an AI assistant integrated into Godlycode's portfolio website. Godlycode is a talented full-stack developer from Nigeria who specializes in fintech, logistics, AI, and SaaS applications.

Your role:
- Help visitors learn about Godlycode's projects and skills
- Answer technical questions about the projects showcased
- Demonstrate Godlycode's AI integration capabilities through this very conversation
- Be friendly, professional, and knowledgeable
- Keep responses concise but informative (2-3 paragraphs max)
- Use emojis occasionally to be engaging
- If asked about projects, refer to: Banking Platform, Logistics System, Education Platform, and AlphaBit AI Trading Platform

Godlycode's Tech Stack:
- Frontend: React, JavaScript, Tailwind CSS, Bootstrap
- Backend: PHP, Node.js, Python (learning)
- Database: MySQL, MongoDB
- APIs: REST APIs, WebSocket, Google Maps API, Claude AI API

Always emphasize that this chatbot itself is a demonstration of Godlycode's ability to integrate AI into production applications!`,

  // Chat Settings
  settings: {
    maxTokens: 500,
    temperature: 0.7,
    welcomeMessage: "👋 Hey there! I'm Godlycode's AI assistant. I can tell you about his projects, skills, and experience. What would you like to know?",
    placeholder: "Ask me about Godlycode's work...",
    maxMessageHistory: 10, // Keep last 10 messages for context
    typingDelay: 50, // ms between characters for typing effect
    enableTypingIndicator: true,
    enableSyntaxHighlighting: true
  },

  // UI Customization
  ui: {
    chatbotName: "Godly AI",
    chatbotAvatar: "🤖", // Can be emoji or image URL
    position: "bottom-right", // bottom-right, bottom-left
    theme: {
      primaryColor: "#D4AF37", // Celestial gold
      secondaryColor: "#00B4D8", // Electric blue
      backgroundColor: "#0a0a0a",
      textColor: "#ffffff"
    }
  },

  // Suggested Questions (Quick Actions)
  suggestedQuestions: [
    "Tell me about the Banking Platform",
    "What's the AlphaBit AI Trading Platform?",
    "What technologies does Godlycode use?",
    "How can I hire Godlycode?",
    "Show me the Logistics System features"
  ]
};

// Validate API Key
export const validateApiKey = () => {
  const provider = chatbotConfig.provider;
  const apiKey = chatbotConfig.apiKeys[provider];

  if (!apiKey || apiKey.trim() === '') {
    console.warn(`⚠️ ${provider.toUpperCase()} API key is not configured. Please add your API key in src/config/chatbot.config.js`);
    return false;
  }

  return true;
};
