import React, { useState } from 'react';
import { LoginButton } from '../LoginButton';
import { useAuth } from '../../auth/AuthContext';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';


export default function LoginScreen({ theme }) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login();
      
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`p-8 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-md w-full`}>
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to AI Chat</h1>
        <p className="mb-8 text-center text-gray-500">Please login to continue</p>
        <div className="flex justify-center">
        <button
            onClick={handleLogin}
            disabled={loading}
            className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-colors
              ${theme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'} 
              disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-xs`}
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            {loading ? 'Signing in...' : 'Sign in with Microsoft'}
          </button>
        </div>
      </div>
    </div>
  );
}
