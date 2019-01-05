const express = require('express');
const path = require('path');

// CONSTANTS
const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
const HOST = '0.0.0.0';

// APP
const server = express();

server.use(express.static('dist'));

server.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
