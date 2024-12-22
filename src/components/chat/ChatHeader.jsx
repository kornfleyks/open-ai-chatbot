import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { 
  SunIcon, 
  MoonIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  EllipsisVerticalIcon,
  ArrowRightOnRectangleIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline';
import { LoginButton } from '../LoginButton';

const ChatHeader = ({ 
  activeThread,
  theme,
  toggleTheme,
  activeThreadId,
  onThreadSelect,
  onOpenModal,
  onClearChat,
  onUpdateThreadTitle,
  exportToPDF
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useAuth();
  const menuRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      <div className="max-w-[800px] mx-auto h-16 grid grid-cols-3 items-center px-4">
        {/* Left side - Logo */}
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

        {/* Center - Thread Selector */}
        <div className="flex justify-center items-center">
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
              <div className="group relative">
                <div className={`absolute inset-0 -right-8 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'group-hover:bg-gray-800'
                    : 'group-hover:bg-gray-100'
                }`}></div>
                <button
                  onClick={onOpenModal}
                  className={`relative flex items-center gap-2 px-3 py-1.5 text-sm ${
                    theme === 'dark'
                      ? 'text-gray-300'
                      : 'text-gray-700'
                  }`}
                >
                  <span className="truncate max-w-[150px] mx-2">
                    {activeThread?.threadTitle || 'Your Chats'}
                  </span>
                </button>
                <div className="absolute -right-5 top-1/2 -translate-y-1/2 flex items-center pl-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className={`h-6 border-l ${
                    theme === 'dark' 
                      ? 'border-gray-600' 
                      : 'border-gray-300'
                  }`}></span>
                  <button
                    className={`p-1.5 ml-1 relative rounded-md transition-colors ${
                      theme === 'dark'
                        ? 'hover:bg-blue-500/40'
                        : 'hover:bg-blue-200'
                    }`}
                    onClick={handleStartEdit}
                  >
                    <PencilIcon 
                      className={`w-4 h-4 ${
                        theme === 'dark'
                          ? 'text-gray-300'
                          : 'text-gray-700'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Theme Toggle & User */}
        <div className="flex items-center justify-end gap-3">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-800 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <EllipsisVerticalIcon className="w-5 h-5" />
            </button>

            {showMenu && (
              <div className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg py-0 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-gray-200'
              }`}>
                {/* User */}
                <LoginButton theme={theme} />

                {/* Theme Toggle */}
                <button
                  onClick={() => {
                    toggleTheme();
                    setShowMenu(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 text-sm ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {theme === 'dark' ? (
                    <>
                      <SunIcon className="w-4 h-4 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <MoonIcon className="w-4 h-4 mr-2" />
                      Dark Mode
                    </>
                  )}
                </button>

                {/* Export to PDF */}
                <button
                  onClick={() => {
                    exportToPDF();
                    setShowMenu(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 text-sm ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
                  Export chat to PDF
                </button>

                {/* Sign Out */}
                <button
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 text-sm ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700 text-red-400'
                      : 'hover:bg-gray-100 text-red-600'
                  }`}
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                  Sign out
                </button>

              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default ChatHeader;