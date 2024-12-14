// src/components/LoginButton.jsx
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { UserCircleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

export function LoginButton({ theme }) {
  const { user, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) {
    return (
      <button
        onClick={login}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
      >
        <UserCircleIcon className="w-5 h-5" />
        Sign in
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
          theme === 'dark' 
            ? 'hover:bg-gray-700' 
            : 'hover:bg-gray-100'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="text-left">
          <div className="text-sm font-medium">{user.name}</div>
          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</div>
        </div>
      </button>

      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-50" 
            onClick={() => setIsMenuOpen(false)}
          />
          <div className={`absolute right-0 mt-2 w-48 py-2 rounded-lg shadow-lg border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}