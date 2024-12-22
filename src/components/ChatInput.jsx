import { useState, useRef, useEffect } from 'react';
import { 
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline';

const SUGGESTIONS = [
  "Tell me about...",
  "How do I...",
  "Can you explain...",
  "What's the difference between...",
  "Tell me about fixer A",
  "Search the database for the role \"fixer\"",
];



function ChatInput({ onSendMessage, isLoading, theme = 'light', messages, title }) {
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  // const inputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && !message) {
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;
    const currentMessage = message;
    setMessage('');
    setShowSuggestions(false);
    await onSendMessage(currentMessage);

    // Focus after a brief delay
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
  };

  return (
    <div className={`${theme === 'dark' ? 'border-gray-700 rounded-2xl' : 'rounded-2xl'} py-4 px-0`}>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
        <div className="relative flex items-center">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyDown={handleKeyPress}
            placeholder="Type / for suggestions or start typing..."
            className={`w-full px-4 py-3 pr-16 ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                : 'bg-gray-200 text-gray-700 border-gray-200'
            } border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-opacity-90 resize-none min-h-[48px] max-h-[150px]`}
            disabled={isLoading}
            rows={1}
          />
          <button
            type="submit"
            disabled={isLoading || !message.trim()}
            className={`absolute right-2 flex items-center justify-center w-10 h-10 ${
              theme === 'dark'
                ? 'text-blue-400 hover:bg-gray-600'
                : 'text-blue-500 hover:bg-gray-100'
            } transition-colors rounded-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>

        {/* Suggestions Popup */}
        {showSuggestions && (
          <div className={`absolute bottom-full mb-6 w-full ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          } rounded-lg shadow-lg border p-2`}>
            {SUGGESTIONS.map((suggestion, index) => (
              <button
                key={index}
                className={`w-full text-left px-3 py-2 ${
                  theme === 'dark'
                    ? 'hover:bg-gray-700 text-gray-200'
                    : 'hover:bg-gray-100 text-gray-700'
                } rounded text-sm`}
                onClick={() => {
                  setMessage(suggestion);
                  setShowSuggestions(false);
                  textareaRef.current?.focus();
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Keyboard shortcuts help */}
        <div className={`flex items-center justify-between text-xs px-4 py-2 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <span>Press / for suggestions</span>
          <span>Shift + Enter for new line • Enter to send</span>
        </div>

      </form>
    </div>
  );
}

export default ChatInput;