@echo off

REM Install Node.js dependencies
npm install express socket.io simple-peer-server

REM Run the server
node server.js
