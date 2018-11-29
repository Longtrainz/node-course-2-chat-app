let socket = io();

socket.on('connect', function() {
    console.log('Connected to Server');

socket.emit('createMessage', {
    from: 'vl@example.com',
    text: 'Sure! In hour at Bernie, ok?'
});

});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('New message', message);   
});



// newMessage (server -> client: from, text, createdAt), createMessage(client -> server: from, text)

    // Inside socket.on('connect')
    // // from client to server
    // socket.emit('createEmail', {
    //     to: 'jen@example.com',
    //     text: 'Hey, buddy!'
    // });


// // custom event listener, from server to client 
// socket.on('newEmail', function (email) {
//     console.log('New email', email);
// });