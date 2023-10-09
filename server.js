const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const SimplePeerServer = require('simple-peer-server');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve your HTML and frontend JavaScript here if needed.
app.use(express.static('public'));

// Initialize the SimplePeerServer
const sps = new SimplePeerServer(io);

// Handle WebRTC connections
sps.on('connection', (client) => {
  console.log(`User connected: ${client.id}`);

  // Handle data channel messages here
  client.on('data', (data) => {
    // Handle incoming data (e.g., changes to the text document)
    console.log(`Received data from ${client.id}: ${data}`);
    
    // Broadcast the data to all connected clients (except the sender)
    client.broadcast('data', data);
  });

  client.on('close', () => {
    console.log(`User disconnected: ${client.id}`);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
