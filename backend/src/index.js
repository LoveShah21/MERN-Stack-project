const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});