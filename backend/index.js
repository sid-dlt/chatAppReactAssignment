const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express()


const server = http.createServer(app);

const wss = new WebSocket.Server({ server });


const clients = [];


wss.on('connection', function connection(ws) {
    
    clients.push(ws);

    
    console.log('A new client connected.');

    ws.on('message', function incoming(message) {
       clients.forEach((client)=>{
        client.send(message.toString())
       })
    });

    
    ws.on('close', function close() {
        
        clients.splice(clients.indexOf(ws), 1);
        console.log('Client disconnected.');
    });
});





server.listen(4000, function() {
    console.log('Server started on port 4000');
});
