const express = require('express');
const app = express();
const path = require('path');
const PORT = 5508;
const axios = require('axios'); // Import axios

// Middleware to parse JSON
app.use(express.json());

app.set('trust proxy', true); // Trust the reverse proxy

// app.use((req, res, next) => {
//     if (req.headers['x-forwarded-proto'] === 'https') {
//         return res.redirect('https://' + req.headers.host + req.url); // Avoid if the proxy is already handling HTTPS
//     }
//     next();
// });

// GET /hello
app.get('/', (req, res) => {
  res.send('Hello World');
});

// GET /api/versions
app.get('/api/versions', (req, res) => {
  res.json({ version: '1.0.0', name: 'Simple API' });
});

// POST /api/chat
// app.post('/api/chat', (req, res) => {
//   const data = req.body;
//   res.json({ message: data });
// });
// POST /api/chat - Forward request to Ollama with streaming
app.post('/api/chat', async (req, res) => {
  const data = req.body;

  try {
    // Make a request to Ollama with responseType as stream
    const response = await axios.post('http://localhost:11434/api/chat', data, {
      responseType: 'stream', // Stream response from Ollama
    });

    // Pipe the stream from Ollama directly to the response
    response.data.pipe(res);
  } catch (error) {
    console.error('Error forwarding request to Ollama:', error);
    res.status(500).json({ message: 'Error communicating with Ollama', error: error.message });
  }
});


// return html file for basic chat page
// GET /chat - serve the HTML file
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
