import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export function ChatSearch({ theme, onSearch }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative">
      {isExpanded ? (
        <div className="flex items-center">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search messages..."
            className={`w-48 px-3 py-1.5 text-sm rounded-lg outline-none transition-all ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
                : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500'
            }`}
            autoFocus
            onBlur={(e) => {
              if (!e.target.value) {
                setIsExpanded(false);
              }
            }}
          />
          <div className={`p-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <MagnifyingGlassIcon className="w-5 h-5" />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className={`p-2 rounded-lg transition-colors ${
            theme === 'dark' 
              ? 'hover:bg-gray-700 text-gray-400' 
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
