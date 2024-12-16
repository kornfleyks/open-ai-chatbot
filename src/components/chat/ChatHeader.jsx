import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { 
  SunIcon, 
  MoonIcon,
  ChevronDownIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon
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
  onOpenModal,
  onClearChat,
  onUpdateThreadTitle
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');

  const handleStartEdit = () => {
    setEditTitle(activeThread?.threadTitle || '');
    setIsEditing(true);
  };

  const handleSaveTitle = () => {
    if (editTitle.trim() && activeThreadId) {
      onUpdateThreadTitle(activeThreadId, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

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
            <span 
              className={`text-xl font-semibold cursor-pointer ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`} 
              onClick={() => {
                onThreadSelect(null);
                onClearChat();
              }}>
              AI Chat
            </span>
          </div>
        </div>

        {/* Right side - Theme Toggle & User */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            {isEditing ? (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                theme === 'dark'
                  ? 'bg-gray-800 text-gray-300'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`bg-transparent outline-none w-[150px] ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  autoFocus
                />
                <button
                  onClick={handleSaveTitle}
                  className="p-1 hover:text-blue-500"
                >
                  <CheckIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1 hover:text-red-500"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenModal}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm group ${
                  theme === 'dark'
                    ? 'hover:bg-gray-800 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="truncate max-w-[150px]">
                  {activeThread?.threadTitle || 'Your Chats'}
                </span>
                <PencilIcon 
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartEdit();
                  }}
                />
              </button>
            )}
          </div>
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