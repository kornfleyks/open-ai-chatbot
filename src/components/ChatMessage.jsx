import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns'
import { useAuth } from '../auth/AuthContext';

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
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start space-x-2 max-w-[80%]`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? 'bg-blue-500 order-2 ml-2' : 'bg-gray-600'
        }`}>
          <span className="text-white text-sm">
            {isUser ? getInitials(user.name) : 'AI'}
          </span>
        </div>
        <div className={`flex flex-col ${isUser ? 'order-1' : ''}`}>
          <div>
            <div className={`rounded-2xl px-6 py-2 ${
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
                    <pre className={`rounded p-2 my-1 overflow-x-auto ${
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
          <div className="flex items-center gap-2 mt-1 mx-2">
            <span className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {format(timestamp, 'EEE, d MMM yyyy, HH:mm')}
            </span>
            {!isUser && message.source && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                getSourceTagColors(message.source)
              }`}>
                {message.source}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
