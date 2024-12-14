import React from 'react';
import ChatMessage from '../ChatMessage';
import ChatInput from '../ChatInput';
import ChatHeader from './ChatHeader';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ChatInterface = ({ 
  theme, 
  messages, 
  error,
  isLoading, 
  handleSendMessage,
  toggleTheme,
  messagesEndRef,
  activeThreadId, 
  threads = [],
  onThreadSelect,
  onNewChat
}) => {
  return (
    <div className={`flex-1 flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <ChatHeader 
        activeThread={activeThreadId}
        theme={theme}
        toggleTheme={toggleTheme}
        threads={threads}
        activeThreadId={activeThreadId}
        onThreadSelect={onThreadSelect}
        onNewChat={onNewChat}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-24 pb-36">
        {activeThreadId ? (
          <div className="max-w-[800px] mx-auto space-y-6">
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id || index}
                message={message}
                theme={theme}
              />
            ))}
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center">
                {error}
              </div>
            )}
            {isLoading && (
              <div className="flex items-center justify-center p-4">
                <div className="animate-pulse text-gray-500">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <h2 className="text-2xl font-semibold mb-2">Welcome to Chat</h2>
              <p>Open the menu to select a chat or start a new one</p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Input Area */}
      {activeThreadId && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-[800px] px-0">
          <div className={`${theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm rounded-lg shadow-lg border`}>
            <ChatInput 
              onSendMessage={handleSendMessage} 
              isLoading={isLoading} 
              theme={theme}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;