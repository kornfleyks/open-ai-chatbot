import React from 'react';
import { useAuth } from '../auth/AuthContext';

export function LoginButton({ theme }) {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="flex items-center gap-2 p-1.5">
      <div className={`w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium`}>
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="text-left">
        <div className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-700'}`}>{user.name}</div>
        <div className={`text-[10px] ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{user.username}</div>
      </div>
    </div>
  );
}