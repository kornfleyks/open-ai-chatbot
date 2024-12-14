import React from 'react';
import { LoginButton } from '../LoginButton';

export default function LoginScreen({ theme }) {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`p-8 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-md w-full`}>
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to AI Chat</h1>
        <p className="mb-8 text-center text-gray-500">Please login to continue</p>
        <div className="flex justify-center">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
