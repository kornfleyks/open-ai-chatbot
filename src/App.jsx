import { useState, useRef, useEffect } from 'react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { LoginButton } from './components/LoginButton';
import { useChat } from './hooks/useChat';

function LoginScreen({ theme }) {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`p-8 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-md w-full`}>
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to AI Chat</h1>
        <p className="mb-8 text-center text-gray-500">Please login to continue</p>
        <div className="flex justify-center">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

function ChatInterface({ theme, messages, error, isLoading, handleSendMessage, clearChat, toggleTheme, messagesEndRef }) {
  return (
    <div className={`flex flex-col h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`flex items-center justify-between p-4 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <h1 className="text-xl font-bold">AI Chat</h1>
        <div className="flex gap-2 items-center">
          <LoginButton />
          <div className="flex gap-2">
            <button
              onClick={clearChat}
              className={`p-2 rounded-full ${
                theme === 'dark' 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              title="Clear chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === 'dark' 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            message={message} 
            theme={theme}
          />
        ))}
        {error && (
          <div className="text-red-500 text-center p-2">
            Error: {error}
          </div>
        )}
        {isLoading && (
          <div className="flex justify-center items-center space-x-1 text-gray-500">
            <div className="w-2 h-2 rounded-full animate-bounce [animation-delay:-0.3s]" style={{ backgroundColor: theme === 'dark' ? '#4B5563' : '#9CA3AF' }}></div>
            <div className="w-2 h-2 rounded-full animate-bounce [animation-delay:-0.15s]" style={{ backgroundColor: theme === 'dark' ? '#4B5563' : '#9CA3AF' }}></div>
            <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: theme === 'dark' ? '#4B5563' : '#9CA3AF' }}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <ChatInput onSendMessage={handleSendMessage} theme={theme} />
      </div>
    </div>
  );
}

function AppContent() {
  const [theme, setTheme] = useState('light');
  const { isAuthenticated } = useAuth();
  const {
    messages,
    isLoading,
    error,
    messagesEndRef,
    sendMessage,
    clearChat
  } = useChat();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return isAuthenticated ? (
    <ChatInterface 
      theme={theme}
      messages={messages}
      error={error}
      isLoading={isLoading}
      handleSendMessage={sendMessage}
      clearChat={clearChat}
      toggleTheme={toggleTheme}
      messagesEndRef={messagesEndRef}
    />
  ) : (
    <LoginScreen theme={theme} />
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;