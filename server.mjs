import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; // Import the CORS package

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors({
  origin: "*"
}));

// Middleware to handle JSON requests
app.use(express.json());

// Endpoint to fetch pages
app.get('/api/pages', async (req, res) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer d7e37134a6d22a78fcf076431c2c1d3ef73c606801b976fed1e2e16359717610',
    },
  };

  try {
    const response = await fetch('https://api.webflow.com/v2/sites/668e54644ae0f7b199067da2/pages', options);
    const data = await response.json();

    // Forward the response from the API to the client
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// New endpoint to fetch collections
app.get('/api/items', async (req, res) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer d7e37134a6d22a78fcf076431c2c1d3ef73c606801b976fed1e2e16359717610',
    },
  };

  try {
    const response = await fetch('https://api.webflow.com/v2/collections/66fd0fe543d4d200a323a9fe/items', options);
    const data = await response.json();

    // Forward the response from the API to the client
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

