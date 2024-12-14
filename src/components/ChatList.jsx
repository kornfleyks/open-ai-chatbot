import React, { useState } from 'react';
import { 
  ChatBubbleLeftIcon, 
  PlusIcon, 
  XMarkIcon,
  Bars3Icon 
} from '@heroicons/react/24/outline';

const ChatList = ({ threads, activeThreadId, onThreadSelect, onNewChat, theme }) => {

  return (
    <div className="relative w-full">
      {/* New Chat Button */}
      <button
        onClick={onNewChat}
        className={`w-full flex items-center gap-2 p-4 ${
          theme === 'dark' ? 'hover:bg-gray-700 border-gray-700' : 'hover:bg-gray-50 border-gray-100'
        } transition-colors border-b`}
      >
        <PlusIcon className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
        <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} font-medium`}>New Chat</span>
      </button>

      {/* Chat List */}
      <div className="max-h-[70vh] overflow-y-auto">
        {threads.map(thread => (
          <div
            key={thread.threadId}
            onClick={() => onThreadSelect(thread.threadId)}
            className={`flex items-start gap-3 p-4 cursor-pointer transition-all ${
              thread.threadId === activeThreadId
                ? theme === 'dark' 
                  ? 'bg-gray-700/50' 
                  : 'bg-blue-50'
                : theme === 'dark'
                  ? 'hover:bg-gray-700'
                  : 'hover:bg-gray-50'
            }`}
          >
            <ChatBubbleLeftIcon className={`w-5 h-5 ${
              thread.threadId === activeThreadId
                ? theme === 'dark'
                  ? 'text-blue-400'
                  : 'text-blue-600'
                : theme === 'dark'
                  ? 'text-gray-400'
                  : 'text-gray-400'
            }`} />
            <div className="flex-1 min-w-0">
              <p className={`font-medium text-sm truncate ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
              }`}>
                {thread.threadTitle}
              </p>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              } mt-1`}>
                {new Date(thread.timestamp).toLocaleDateString()} · 
                {thread.messages.length} messages
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;