import { useState, useRef, useEffect } from 'react';
import { serverChatService } from '../services/api/serverChatService';
import { useAuth } from '../auth/AuthContext';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [threads, setThreads] = useState([]);

  function generateUniqueId(email) {
    return `${email}-${Date.now()}`;
  }
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function loadThreadsFromLocalStorage(email) {
    const userData = JSON.parse(localStorage.getItem(email)) || { threads: [] };
    return userData.threads.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  function createNewThread() {
    if (!user?.email) return;
    
    const newThreadId = generateUniqueId(user.email);
    const userData = JSON.parse(localStorage.getItem(user.email)) || { threads: [] };
    
    const newThread = {
        threadId: newThreadId,
        threadTitle: 'New Chat',
        timestamp: new Date().toISOString(),
        messages: []
    };
    
    userData.threads.push(newThread);
    localStorage.setItem(user.email, JSON.stringify(userData));
    setActiveThreadId(newThreadId);
    setMessages([]);
    setThreads(userData.threads);
    return newThreadId;
  }

  function switchThread(threadId) {
    if (!user?.email) return;
    
    const userData = JSON.parse(localStorage.getItem(user.email)) || { threads: [] };
    const thread = userData.threads.find(t => t.threadId === threadId);
    if (thread) {
      setMessages([]); // Clear messages first
      setActiveThreadId(threadId);
      setTimeout(() => {
        setMessages(thread.messages); // Set new messages after a brief delay
      }, 0);
  }
  }

useEffect(() => {
    if (user?.email) {
        const loadedThreads = loadThreadsFromLocalStorage(user.email);
        setThreads(loadedThreads);
        
        // If there are threads, set the most recent one as active
        if (loadedThreads.length > 0) {
            setActiveThreadId(loadedThreads[0].id);
            setMessages(loadedThreads[0].messages);
        } else {
            // Create a new thread if none exist
            createNewThread();
        }
    }
}, [user?.email]);

function saveMessageToLocalStorage(email, message, source, role) {
  if (!activeThreadId) return;
  
  const userData = JSON.parse(localStorage.getItem(email)) || { threads: [] };
  const threadIndex = userData.threads.findIndex(t => t.threadId === activeThreadId);
  
  if (threadIndex === -1) return;

  const newMessage = {
      id: generateUniqueId(email),
      content: message,
      email: user.email,
      source: source,
      role: role,
      timestamp: new Date().toISOString()
  };

  userData.threads[threadIndex].messages.push(newMessage);
  
  // Update thread title with first message if it's "New Chat"
  if (userData.threads[threadIndex].threadTitle === 'New Chat' && userData.threads[threadIndex].messages.length === 1) {
      userData.threads[threadIndex].threadTitle = message.substring(0, 30) + (message.length > 30 ? '...' : '');
  }
  
  localStorage.setItem(email, JSON.stringify(userData));
  setThreads(userData.threads);
}

  const sendMessage = async (message) => {
    if (!message.trim()) return;
    setError('');

    const userMessage = { role: 'user', content: message };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    setIsLoading(true);
    try {
      const assistantMessage = await serverChatService.sendMessage([...messages, userMessage]);
      setMessages(prevMessages => [...prevMessages, assistantMessage]);

      saveMessageToLocalStorage(user.email, message, 'user', 'user');
      saveMessageToLocalStorage(user.email, assistantMessage.content, assistantMessage.source, assistantMessage.role);
    } catch (err) {
      console.error(err);
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
    sendMessage,
    isLoading,
    error,
    threads,
    activeThreadId,
    createNewThread,
    switchThread,
    messagesEndRef
  };
}
