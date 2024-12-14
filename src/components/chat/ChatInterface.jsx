import React from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from '../common/ErrorMessage';

export default function ChatInterface({ 
  theme, 
  messages, 
  error, 
  isLoading, 
  handleSendMessage, 
  clearChat, 
  toggleTheme, 
  messagesEndRef 
}) {
  return (
    <div className={`flex flex-col h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <ChatHeader 
        theme={theme} 
        clearChat={clearChat} 
        toggleTheme={toggleTheme} 
      />

      {/* Chat Messages */}
      <div className={`flex-1 overflow-y-auto p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage 
              key={index} 
              message={msg} 
              theme={theme}
            />
          ))}
          <div ref={messagesEndRef} />
          {error && <ErrorMessage error={error} theme={theme} />}
          {isLoading && <LoadingIndicator theme={theme} />}
        </div>
      </div>

      <ChatInput 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading}
        theme={theme}
      />
    </div>
  );
}
