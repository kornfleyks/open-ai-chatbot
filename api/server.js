require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const { searchDatabase } = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('No OpenAI API key found in environment variables!');
}

const openai = new OpenAI({
  apiKey: apiKey
});

// Define the available functions that the AI can call
const availableFunctions = {
  searchDatabase: async (query) => {
    return await searchDatabase(query);
  }
};

app.post('/api/chat', async (req, res) => {
  try {
    const messages = [
      {
        role: "system",
        content: "You are a helpful assistant with access to a product database and fixers. When users ask about products or fixers, try searching the database first. If no relevant results are found in the database, or if the question is not about products or fixers, provide a helpful response based on your general knowledge. Always be helpful and informative, whether using database information or not."
      },
      ...req.body.messages
    ];

    // First, call OpenAI API with function definitions
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      functions: [
        {
          name: "searchDatabase",
          description: "Search the product database for information about products and fixers. Only use this when users specifically ask about products or fixers.",
          parameters: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "The search query to find product or fixer information in the database"
              }
            },
            required: ["query"]
          }
        }
      ],
      function_call: "auto"
    });

    const responseMessage = completion.choices[0].message;

    // Check if the model wants to call a function
    if (responseMessage.function_call) {
      const functionName = responseMessage.function_call.name;
      const functionArgs = JSON.parse(responseMessage.function_call.arguments);
      
      // Execute the function
      const functionResponse = await availableFunctions[functionName](functionArgs.query);

      // If no results found in database, let AI respond without database info
      if (!functionResponse || functionResponse.length === 0) {
        const generalResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            ...messages,
            {
              role: "assistant",
              content: "I couldn't find any specific product or fixer information in our database about that. Let me provide a general response based on my knowledge."
            }
          ]
        });
        res.json({ 
          response: { 
            ...generalResponse.choices[0].message,
            source: 'Source: Web'
          } 
        });
        return;
      }

      // Call OpenAI again with the function response
      const secondCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          ...messages,
          responseMessage,
          {
            role: "function",
            name: functionName,
            content: JSON.stringify(functionResponse)
          }
        ]
      });

      res.json({ 
        response: {
          ...secondCompletion.choices[0].message,
          source: 'Source: Database'
        }
      });
    } else {
      res.json({ 
        response: {
          ...responseMessage,
          source: 'Source: Web'
        }
      });
    }
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});