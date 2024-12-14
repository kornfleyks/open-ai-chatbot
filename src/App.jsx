import React, { useState } from 'react';
import { useAuth } from './auth/AuthContext';
import { useChat } from './hooks/useChat';
import ChatInterface from './components/chat/ChatInterface';
import LoginScreen from './components/auth/LoginScreen';
import { Toaster } from 'react-hot-toast';
import ChatList from './components/ChatList';

function App() {
  const [theme, setTheme] = useState('light');
  const { user } = useAuth();
  const { 
    messages, 
    isLoading,
    error,
    messagesEndRef,
    threads,
    activeThreadId,
    createNewThread,
    switchThread,
    sendMessage,
    clearChat
  } = useChat();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Toaster position="top-center" />
      
      {!user ? (
        <LoginScreen theme={theme} />
      ) : (
        <>
          <ChatInterface
            messages={messages}
            error={error}
            isLoading={isLoading}
            handleSendMessage={sendMessage}
            toggleTheme={toggleTheme}
            messagesEndRef={messagesEndRef}
            theme={theme}
            activeThreadId={activeThreadId}
            threads={threads}
            onThreadSelect={switchThread}
            onNewChat={createNewThread}
          />
        </>
      )}
    </div>
  );
}

export default App;