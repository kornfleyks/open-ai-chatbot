import { useState, useRef, useEffect } from 'react';
import { serverChatService } from '../services/api/serverChatService';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message) => {
    if (!message.trim()) return;
    setError('');

    const userMessage = { role: 'user', content: message };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    setIsLoading(true);
    try {
      const assistantMessage = await serverChatService.sendMessage([...messages, userMessage]);
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (err) {
      setError(err.message || 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    isLoading,
    error,
    messagesEndRef,
    sendMessage,
    clearChat
  };
}
