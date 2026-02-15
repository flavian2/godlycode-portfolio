import { chatbotConfig } from '../config/chatbot.config';

/**
 * AI Service - Handles communication with AI APIs (Claude & Venice)
 */

class AIService {
  constructor() {
    this.provider = chatbotConfig.provider;
    this.apiKey = chatbotConfig.apiKeys[this.provider];
    this.endpoint = chatbotConfig.apiEndpoints[this.provider];
    this.model = chatbotConfig.models[this.provider];
    this.messageHistory = [];
  }

  /**
   * Send message to AI and get response
   */
  async sendMessage(userMessage) {
    if (!this.apiKey) {
      throw new Error(`API key for ${this.provider} is not configured. Please add it in chatbot.config.js`);
    }

    // Add user message to history
    this.messageHistory.push({
      role: 'user',
      content: userMessage
    });

    // Keep only last N messages for context
    const maxHistory = chatbotConfig.settings.maxMessageHistory;
    if (this.messageHistory.length > maxHistory * 2) {
      this.messageHistory = this.messageHistory.slice(-maxHistory * 2);
    }

    try {
      if (this.provider === 'claude') {
        return await this.sendToClaude(userMessage);
      } else if (this.provider === 'venice') {
        return await this.sendToVenice(userMessage);
      } else {
        throw new Error(`Unknown provider: ${this.provider}`);
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }

  /**
   * Send to Claude API
   */
  async sendToClaude(userMessage) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: chatbotConfig.settings.maxTokens,
        temperature: chatbotConfig.settings.temperature,
        system: chatbotConfig.systemPrompt,
        messages: this.messageHistory
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Claude API request failed');
    }

    const data = await response.json();
    const assistantMessage = data.content[0].text;

    // Add assistant response to history
    this.messageHistory.push({
      role: 'assistant',
      content: assistantMessage
    });

    return assistantMessage;
  }

  /**
   * Send to Venice AI
   */
  async sendToVenice(userMessage) {
    // Prepare messages with system prompt
    const messages = [
      {
        role: 'system',
        content: chatbotConfig.systemPrompt
      },
      ...this.messageHistory
    ];

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model,
        messages: messages,
        max_tokens: chatbotConfig.settings.maxTokens,
        temperature: chatbotConfig.settings.temperature
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Venice AI request failed');
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    // Add assistant response to history
    this.messageHistory.push({
      role: 'assistant',
      content: assistantMessage
    });

    return assistantMessage;
  }

  /**
   * Clear conversation history
   */
  clearHistory() {
    this.messageHistory = [];
  }

  /**
   * Get conversation history
   */
  getHistory() {
    return this.messageHistory;
  }
}

// Export singleton instance
export const aiService = new AIService();
