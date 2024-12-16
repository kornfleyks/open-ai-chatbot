import React, { useState } from 'react';
import { useAuth } from './auth/AuthContext';
import { useChat } from './hooks/useChat';
import ChatInterface from './components/chat/ChatInterface';
import LoginScreen from './components/auth/LoginScreen';
import { Toaster } from 'react-hot-toast';
import { ChatListModal } from './components/chat/ChatListModal';

function App() {
  console.log("App is running");
  const [theme, setTheme] = useState('light');
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    clearChat,
    deleteThread,
    updateThreadTitle
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
            onOpenModal={() => setIsModalOpen(true)}
            onClearChat={clearChat}
            onUpdateThreadTitle={updateThreadTitle}
          />
          <ChatListModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            threads={threads}
            activeThreadId={activeThreadId}
            onThreadSelect={switchThread}
            onNewChat={createNewThread}
            onDeleteThread={deleteThread}
            theme={theme}
          />
        </>
      )}
    </div>
  );
}

export default App;