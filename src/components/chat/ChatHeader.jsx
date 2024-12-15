import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { 
  SunIcon, 
  MoonIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { LoginButton } from '../LoginButton';
import { ChatListModal } from './ChatListModal';

const ChatHeader = ({ 
  activeThread,
  theme,
  toggleTheme,
  threads,
  activeThreadId,
  onThreadSelect,
  onNewChat,
  onOpenModal
}) => {

  return (
    <header className={`fixed top-0 left-0 right-0 ${
      theme === 'dark' 
        ? 'bg-gray-900/80 border-gray-700' 
        : 'bg-white/80 border-gray-200'
    } backdrop-blur-sm z-40 border-b`}>
      <div className="max-w-[800px] mx-auto h-16 flex items-center justify-between px-4">
        {/* Left side - Logo & Thread Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <span className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              AI Chat
            </span>
          </div>
          
          <button
            onClick={onOpenModal}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
              theme === 'dark'
                ? 'hover:bg-gray-800 text-gray-300'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <span className="truncate max-w-[150px]">
              {activeThread?.threadTitle || 'Your Chats'}
            </span>
            {/* <ChevronDownIcon className="w-4 h-4" /> */}
          </button>
        </div>

        {/* Right side - Theme Toggle & User */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'hover:bg-gray-800 text-gray-300'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>

          <LoginButton theme={theme} />
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;