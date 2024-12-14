const API_URL = 'http://localhost:3001';

class ServerChatService {
  async sendMessage(messages) {
    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('ServerChatService Error:', error);
      throw error;
    }
  }
}

export const serverChatService = new ServerChatService();
