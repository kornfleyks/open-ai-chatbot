# OpenAI Chatbot

A modern chatbot application built with React and Node.js that leverages OpenAI's API. The chatbot can search through a product database and provide general knowledge responses.

## Features

- 🤖 AI-powered responses using OpenAI's API
- 🔍 Database search integration
- 🌓 Dark/Light theme support
- 👤 Mock authentication system
- 💬 Real-time chat interface
- 🏷️ Source tagging for responses (Database/Web)
- ⌨️ Auto-suggestions for common prompts
- 📅 Timestamp with date display

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/openai-chatbot.git
cd openai-chatbot
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd api
npm install
```

3. Create a `.env` file in the api directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

4. Start the development servers:
```bash
# Start the backend server (from the api directory)
npm start

# In a new terminal, start the frontend (from the root directory)
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Project Structure

```
openai-chatbot/
├── api/                    # Backend server
│   ├── server.js          # Express server setup
│   └── database.js        # Mock database implementation
├── src/
│   ├── components/        # React components
│   ├── auth/              # Authentication context and services
│   ├── hooks/            # Custom React hooks
│   └── App.jsx           # Main application component
├── public/               # Static assets
└── package.json         # Project dependencies and scripts
```

## Features in Detail

### Authentication
- Mock authentication system
- User session management
- Profile initials display

### Chat Interface
- Real-time message updates
- Markdown support for messages
- Code block formatting
- Dark/Light theme support
- Message source indicators (Database/Web)
- Timestamps with date

### AI Integration
- OpenAI API integration
- Context-aware responses
- Database search capability
- Auto-suggestions for prompts

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Markdown
- date-fns

### Backend
- Node.js
- Express
- OpenAI API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the API
- React and Node.js communities for excellent documentation
- All contributors who help improve this project