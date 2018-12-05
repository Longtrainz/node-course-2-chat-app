let socket = io();

socket.on('connect', function() {
    console.log('Connected to Server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('New message', message);  

    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () { 

    });
});



// let li = document.createElement('li');
// li.appendChild(document.createTextNode(`${message.from}: ${message.text}`));
// document.getElementById('messages').appendChild(li);


// document.getElementById('message-form').addEventListener('submit', (e) => {
//     e.preventDefault();
//     let inputVaue = document.querySelector('[name=message]').value;

//     socket.emit('createMessage', {
//         from: 'User',
//         text: inputVaue
//     }, () => {
        
//     });
// });








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