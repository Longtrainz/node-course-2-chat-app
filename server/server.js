const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server); // we get web sockets server into 'io' variable

app.use(express.static(publicPath));

// 'on' - lets u register event listener, we can listen for specific event and do smth when event happens
// 'connection' - event that listens for new connection - client connected to the server
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('createMessage', function(message) {
        console.log('Created message', message);
    });

    socket.emit('newMessage', {
        from: 'jenie@example.com',
        text: 'Hey, wanna dinner?',
        createdAt: 123
    });


    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});



server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});



// Inside io.on('connection')
//   // From server to client
//   socket.emit('newEmail', {
//     from: 'mike@example.com',
//     text: 'Hey! Wazzzuuup!',
//     createdAt: 123
// });




// // custom event listener, from client to server
// socket.on('createEmail', (newEmail) => {
//     console.log('createEmal', newEmail);
// });