import { useState, useRef, useEffect } from 'react';
import { serverChatService } from '../services/api/serverChatService';
import { useAuth } from '../auth/AuthContext';
import { set } from 'date-fns';
import toast from 'react-hot-toast';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [threads, setThreads] = useState([]);
  const [theme, setTheme] = useState('light');
  const [saveTimeout, setSaveTimeout] = useState(null);

  //geenerate unique id
  function generateUniqueId(email) {
    return `${email}-${Date.now()}`;
  }

  const debouncedSyncWithDatabase = (username, userData) => {
    // Clear any existing timeout
    if (saveTimeout) clearTimeout(saveTimeout);
    
    // Set new timeout
    const timeoutId = setTimeout(() => {
        syncWithDatabase(username, userData);
    }, 2000); // 2 second delay
    
    setSaveTimeout(timeoutId);
  };

  // Use this when messages change
  useEffect(() => {
      if (!user?.username) return;
      
      const userData = JSON.parse(localStorage.getItem(user.username)) || { threads: [] };
      const currentThread = userData.threads.find(t => t.threadId === activeThreadId);
      if (currentThread) {
          currentThread.messages = messages;
          localStorage.setItem(user.username, JSON.stringify(userData));
          debouncedSyncWithDatabase(user.username, userData);
      }
  }, [messages]);
  
  // Function to scroll to the bottom of the message list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to load threads from local storage
  function loadThreadsFromLocalStorage(email) {
    const userData = JSON.parse(localStorage.getItem(email)) || { threads: [] };
    return userData.threads.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  // Function to load threads from database
  const loadThreadsFromDatabase = async (username) => {
    try {
      const response = await fetch(`http://localhost:3001/api/threads/${username}`);
      if (!response.ok) throw new Error('Failed to fetch threads');
      const userData = await response.json();
      console.log('Loaded threads from database:', userData);
      return userData.threads.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
      console.error('Error loading threads:', error);
      return [];
    }
  };

  // Load threads when user changes
  useEffect(() => {
    if (user?.username) {
      loadThreadsFromDatabase(user.username).then(loadedThreads => {
        console.log('Loaded threads from database:', loadedThreads);
        setThreads(loadedThreads);
      });
    }
  }, [user?.username]);

  const syncWithDatabase = async (username, userData) => {
    try {
        const baseUrl = 'http://localhost:3001/api/threads';
        const response = await fetch(`${baseUrl}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                threads: userData.threads
            })
        });
        
        if (!response.ok) throw new Error('Database sync failed');
        const data = await response.json();
        //////console.log('Synced data:', data);
    } catch (error) {
        console.error('Database sync error:', error);
    }
  };

  // Function to create a new thread
  function createNewThread() {
    if (!user?.username) return;
    
    const newThreadId = generateUniqueId(user.username);
    const userData = JSON.parse(localStorage.getItem(user.username)) || { data: {} };
    
    const newThread = {
        threadId: newThreadId,
        threadTitle: 'New Chat',
        timestamp: new Date().toISOString(),
        messages: []
    };
    
    // Save to localStorage
    userData.threads.push(newThread);
    localStorage.setItem(user.username, JSON.stringify(userData));

    // Add debug logging
    ////console.log('About to sync with database:', {username: user.username,userData: userData});

    // Sync with database
    syncWithDatabase(user.username, userData);

    setActiveThreadId(newThreadId);
    setMessages([]);
    setThreads(userData.threads);
    toast.success('New thread created', {
      duration: 2000,
      className: theme === 'dark' ? '!bg-gray-800 !text-white' : '!bg-white',
      iconTheme: {
        primary: '#10B981',
        secondary: 'white',
      },
    });
    return newThreadId;
  }

  // Function to switch between threads
  function switchThread(threadId) {
    if (!user?.username) return;
    
    const userData = JSON.parse(localStorage.getItem(user.username)) || { threads: [] };
    const thread = userData.threads.find(t => t.threadId === threadId);
    if (thread) {
      setMessages([]); // Clear messages first
      setActiveThreadId(threadId);
      setTimeout(() => {
        setMessages(thread.messages); // Set new messages after a brief delay
      }, 0);
    } else {
      setActiveThreadId(null);
    }
  }

  // Function to delete a thread
  function deleteThread(threadId) {
    if (!user?.username) return;
    
    const userData = JSON.parse(localStorage.getItem(user.username)) || { threads: [] };
    const threadIndex = userData.threads.findIndex(t => t.threadId === threadId);
    
    if (threadIndex === -1) return;
    
    // Remove the thread
    userData.threads.splice(threadIndex, 1);
    localStorage.setItem(user.username, JSON.stringify(userData));
    
    // Update state
    setThreads(userData.threads);
    
    // If we deleted the active thread, switch to another thread or create new one
    if (threadId === activeThreadId) {
      if (userData.threads.length > 0) {
        switchThread(userData.threads[0].threadId);
      } else {
        // createNewThread();
        setActiveThreadId(null);
      }
      toast.error('Thread deleted', {
        duration: 2000,
        className: theme === 'dark' ? '!bg-gray-800 !text-white' : '!bg-white',
        iconTheme: {
          primary: '#EF4444',
          secondary: 'white',
        },
      });
    }
    // Sync with database immediately for deletion
    syncWithDatabase(user.username, userData);
  }

  // Function to update the title of a thread
  function updateThreadTitle(threadId, newTitle) {
    if (!user?.username) return;
    
    const userData = JSON.parse(localStorage.getItem(user.username)) || { threads: [] };
    const threadIndex = userData.threads.findIndex(t => t.threadId === threadId);
    
    if (threadIndex === -1) return;
    
    // Update the thread title
    userData.threads[threadIndex].threadTitle = newTitle;
    localStorage.setItem(user.username, JSON.stringify(userData));
    
    // Update state
    setThreads([...userData.threads]);
    // Sync with database immediately for title updates
    syncWithDatabase(user.username, userData);
  }

  // Load threads from local storage
  useEffect(() => {
    return;
      if (user?.username) {
          const loadedThreads = loadThreadsFromDatabase(user.username);
          setThreads(loadedThreads);
          
          // If there are threads, set the most recent one as active
          if (loadedThreads.length > 0) {
              setActiveThreadId(loadedThreads[0].id);
              setMessages(loadedThreads[0].messages);
              
          } else {
              // Create a new thread if none exist
              // createNewThread();
          }
      }
  }, [user?.username]);

  // Function to save message to local storage
  function saveMessageToLocalStorage(email, message, source, role) {
    if (!activeThreadId) return;
    
    const userData = JSON.parse(localStorage.getItem(email)) || { threads: [] };
    const threadIndex = userData.threads.findIndex(t => t.threadId === activeThreadId);
    
    if (threadIndex === -1) return;

    const newMessage = {
        id: generateUniqueId(email),
        content: message,
        email: user.username,
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

  // Function to send a message
  const sendMessage = async (message) => {
    if (!message.trim()) return;
    setError('');

    const userMessage = { role: 'user', content: message };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    setIsLoading(true);
    try {
      const assistantMessage = await serverChatService.sendMessage([...messages, userMessage]);
      setMessages(prevMessages => [...prevMessages, assistantMessage]);

      saveMessageToLocalStorage(user.username, message, 'user', 'user');
      saveMessageToLocalStorage(user.username, assistantMessage.content, assistantMessage.source, assistantMessage.role);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to clear the screen
  const clearChat = () => {
    setMessages([]);
    setError(null);
    // setThreads([]);
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
    messagesEndRef,
    deleteThread,
    clearChat,
    updateThreadTitle,
    theme,
    setTheme
  };
}
