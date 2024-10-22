const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Loads .env file into process.env

const app = express();
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON from the frontend

// Define an endpoint to handle chatbot requests
app.post('/chat', async (req, res) => {
    const { userMessage } = req.body; // Get user's message from the request body

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "text-davinci-003",
                prompt: `You are Deadpool. Respond sarcastically to: ${userMessage}`,
                max_tokens: 60,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Use the API key from .env
                },
            }
        );

        res.json(response.data); // Send OpenAI's response back to the frontend
    } catch (error) {
        res.status(500).json({ error: 'Error communicating with OpenAI' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
