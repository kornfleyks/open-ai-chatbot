import React from 'react';

export default function LoadingIndicator({ theme }) {
  return (
    <div className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
      <div className="animate-bounce">●</div>
      <div className="animate-bounce delay-100">●</div>
      <div className="animate-bounce delay-200">●</div>
    </div>
  );
}
