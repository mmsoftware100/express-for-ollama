const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// GET /hello
app.get('/', (req, res) => {
  res.send('Hello World');
});

// GET /api/versions
app.get('/api/versions', (req, res) => {
  res.json({ version: '1.0.0', name: 'Simple API' });
});

// POST /api/chat
app.post('/api/chat', (req, res) => {
  const data = req.body;
  res.json({ message: data });
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
