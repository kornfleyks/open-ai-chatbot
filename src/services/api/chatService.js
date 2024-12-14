import OpenAI from 'openai';

class ChatService {
  constructor() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }
    
    this.openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async sendMessage(messages) {
    try {
      const completion = await this.openai.chat.completions.create({
        messages: messages,
        model: 'gpt-3.5-turbo',
      });

      return completion.choices[0].message;
    } catch (error) {
      console.error('ChatService Error:', error);
      throw error;
    }
  }
}

export const chatService = new ChatService();
