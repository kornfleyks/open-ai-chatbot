import React from 'react';
import ChatMessage from '../ChatMessage';
import ChatInput from '../ChatInput';
import ChatHeader from './ChatHeader';

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
  onNewChat,
  onOpenModal,
  onUpdateThreadTitle
}) => {
  return (
    <div className={`flex-1 flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <ChatHeader 
        activeThread={threads.find(t => t.threadId === activeThreadId)}
        theme={theme}
        toggleTheme={toggleTheme}
        threads={threads}
        activeThreadId={activeThreadId}
        onThreadSelect={onThreadSelect}
        onNewChat={onNewChat}
        onOpenModal={onOpenModal}
        onUpdateThreadTitle={onUpdateThreadTitle}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-24 pb-36 relative z-0">
        {threads.length > 0 && activeThreadId ? (
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
          <div className="max-w-[800px] mx-auto h-full flex flex-col items-center justify-center text-center px-4 relative z-0">
            <div className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              Welcome to AI Chat
            </div>
            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Start a new conversation or select an existing chat
            </p>
            <button
              onClick={onNewChat}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
              } transition-colors`}
            >
              Start New Chat
            </button>
            {
              threads.length > 0 && (
                <div className="mt-8">
                  <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    Existing Chats
                  </h2>
                  <div className="mt-4 space-y-1">
                    {threads.map((thread) => (
                      <div
                        key={thread.threadId}
                        onClick={() => onThreadSelect(thread.threadId)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                          theme === 'dark'
                            ? 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400'
                            : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
                        } transition-colors cursor-pointer`}
                      >
                        {thread.threadTitle}
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
          </div>
        )}
      </div>

      {/* Floating Input Area */}
      {activeThreadId && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-[800px] px-0">
          <div className={`${theme === 'dark' ? 'bg-gray-800/60 border-gray-700' : 'bg-white/60 border-gray-200'} backdrop-blur-sm rounded-lg shadow-lg border`}>
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