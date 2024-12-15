import React, { useState } from 'react';
import { 
  XMarkIcon, 
  MagnifyingGlassIcon,
  ChatBubbleLeftIcon,
  PlusIcon,
  TrashIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export function ChatListModal({ 
  isOpen, 
  onClose, 
  threads, 
  activeThreadId, 
  onThreadSelect, 
  onNewChat, 
  theme 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!isOpen) return null;

  const filteredThreads = threads.filter(thread => 
    thread.threadTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className={`relative w-full max-w-2xl rounded-xl shadow-lg ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        } max-h-[85vh] flex flex-col`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Your Chats
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-800 text-gray-400'
                  : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Search and New Chat */}
          <div className="p-4 space-y-4">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <MagnifyingGlassIcon className={`w-5 h-5 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`flex-1 bg-transparent border-none focus:outline-none ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                } placeholder:${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}
              />
            </div>

            <button
              onClick={() => {
                onNewChat();
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
              }`}
            >
              <PlusIcon className="w-5 h-5" />
              <span className="font-medium">New Chat</span>
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {filteredThreads.map(thread => (
              <div
                key={thread.threadId}
                className="group relative"
              >
                <div
                  onClick={() => {
                    onThreadSelect(thread.threadId);
                    onClose();
                  }}
                  className={`w-full flex items-start gap-4 p-4 rounded-lg transition-all cursor-pointer ${
                    thread.threadId === activeThreadId
                      ? theme === 'dark'
                        ? 'bg-gray-800'
                        : 'bg-gray-100'
                      : theme === 'dark'
                        ? 'hover:bg-gray-800/50'
                        : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    thread.threadId === activeThreadId
                      ? theme === 'dark'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-blue-100 text-blue-600'
                      : theme === 'dark'
                        ? 'bg-gray-800 text-gray-400'
                        : 'bg-gray-100 text-gray-500'
                  }`}>
                    <ChatBubbleLeftIcon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium truncate ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {thread.threadTitle}
                    </h3>
                    <p className={`text-sm truncate mt-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {thread.messages[thread.messages.length - 1]?.content || 'No messages'}
                    </p>
                    <div className={`flex items-center gap-2 mt-2 text-xs ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      <span>{new Date(thread.timestamp).toLocaleDateString()}</span>
                      <span>·</span>
                      <span>{thread.messages.length} messages</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle favorite
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'hover:bg-gray-700 text-gray-400'
                          : 'hover:bg-gray-200 text-gray-500'
                      }`}
                    >
                      <StarIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle delete
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'hover:bg-red-500/20 text-red-400'
                          : 'hover:bg-red-50 text-red-500'
                      }`}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}