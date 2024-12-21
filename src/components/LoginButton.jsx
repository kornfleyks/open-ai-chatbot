import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

export function LoginButton({ theme }) {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(user.username);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div 
      className="flex items-center gap-2 p-1.5 relative cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      onClick={handleCopyEmail}
      title="Click to copy email"
    >
      <div className={`w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium`}>
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="text-left">
        <div className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-700'}`}>{user.name}</div>
        <div className={`text-[10px] ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{user.username}</div>
      </div>
      {copied && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded">
          Email Copied!
        </div>
      )}
    </div>
  );
}