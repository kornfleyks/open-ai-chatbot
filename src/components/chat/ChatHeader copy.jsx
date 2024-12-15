import React from 'react';
import { useAuth } from '../../auth/AuthContext';
import { 
  ArrowRightOnRectangleIcon,
  SunIcon, 
  MoonIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import ChatList from '../ChatList';

const ChatHeader = ({ 
  activeThread,
  theme,
  toggleTheme,
  threads,
  activeThreadId,
  onThreadSelect,
  onNewChat
}) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className={`fixed top-0 left-0 right-0 ${theme === 'dark' ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm z-40`}>
      <div className="max-w-[800px] mx-auto px-0 h-16 flex items-center justify-between gap-4 p-0">
        {/* Left side - Menu Button & Thread Title */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
          >
            {isMenuOpen ? (
              <XMarkIcon className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
            ) : (
              <Bars3Icon className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
            )}
          </button>
          <div>
            <h1 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} truncate`}>
              {activeThread ? 'Chat' : 'Welcome'}
            </h1>
            {user && (
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} truncate`}>
                {user.email}
              </p>
            )}
          </div>
        </div>

        {/* Right side - Theme Toggle & Logout */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5 text-gray-300" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <div className={`w-px h-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <button
            onClick={logout}
            className={`p-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>

      {/* Chat List Menu */}
      {isMenuOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-[850px] px-4">
          <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-b-lg shadow-xl border-x border-b`}>      
            <ChatList
              threads={threads}
              activeThreadId={activeThreadId}
              onThreadSelect={(threadId) => {
                onThreadSelect(threadId);
                setIsMenuOpen(false);
              }}
              onNewChat={() => {
                onNewChat();
                setIsMenuOpen(false);
              }}
              theme={theme}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;