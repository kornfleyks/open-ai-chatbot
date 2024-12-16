import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { useAuth } from '../auth/AuthContext';
import { ClipboardDocumentIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

function ChatMessage({ message, timestamp = new Date(), theme = 'light' }) {
  const isUser = message.role === 'user';
  const { user } = useAuth();

  const getSourceTagColors = (source) => {
    if (theme === 'dark') {
      return source === 'Source: Database'
        ? 'bg-green-700 text-green-100'
        : 'bg-blue-700 text-blue-100';
    }
    return source === 'Source: Database'
      ? 'bg-green-100 text-green-800'
      : 'bg-blue-100 text-blue-800';
  };

  const getInitials = (name) => {
    // Remove the part after |
    const cleanName = name.split('|')[0].trim();
    // Split the name into parts
    const nameParts = cleanName.split(' ');
    // Get first letter of each part and join them
    return nameParts
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast.success('Message copied to clipboard', {
      duration: 2000,
      className: theme === 'dark' ? '!bg-gray-800 !text-white' : '!bg-white',
      iconTheme: {
        primary: '#10B981',
        secondary: 'white',
      },
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}>
     <div className={`flex items-start gap-3 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? 'bg-blue-500' : 'bg-gray-600'
        }`}>
          <span className="text-white text-sm">
            {isUser ? getInitials(user.name) : 'AI'}
          </span>
        </div>
        <div className={`flex flex-col`}>
          <div className="relative">
            <div className={`rounded-xl px-6 py-2 ${
              isUser 
                ? 'bg-blue-500 text-white rounded-tr-none' 
                : theme === 'dark'
                  ? 'bg-gray-700 text-gray-100 rounded-tl-none'
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
            }`}>
              
              <ReactMarkdown 
                className="text-sm whitespace-pre-wrap prose prose-sm max-w-none"
                components={{
                  p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                  code: ({ children }) => (
                    <code className={`bg-opacity-25 rounded px-1 py-0.5 ${
                      theme === 'dark' ? 'bg-black text-gray-300' : 'bg-gray-800 text-gray-800'
                    }`}>{children}</code>
                  ),
                  pre: ({ children }) => (
                    <pre className={`rounded p-4 my-1 overflow-x-auto ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      {children}
                    </pre>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
              
            </div>
          </div>
          <div className={`flex items-center mt-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            
            <div className={`flex items-center gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {new Date(timestamp).toLocaleTimeString()}
              </span>
              {!isUser && message.source && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  getSourceTagColors(message.source)
                }`}>
                  {message.source}
                </span>
              )}
            </div>
            {/* Quick Actions */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <button
                  onClick={handleCopy}
                  className={`p-1.5 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
                  title="Copy message"
                >
                  <ClipboardDocumentIcon className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                </button>
                {isUser && (
                  <button
                    className={`p-1.5 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
                    title="Edit message"
                  >
                    <PencilSquareIcon className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                  </button>
                )}
            </div>


            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
