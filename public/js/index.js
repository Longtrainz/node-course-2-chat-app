let socket = io();

socket.on('connect', function () {
    console.log('Connected to Server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
       text: message.text,
       from: message.from, 
       createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});


socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime 
    });

    jQuery('#messages').append(html);
});

// Create message, listen to submit button
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    let messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

// Crete location message, Get location by clicking button
let locationButton = jQuery('#send-location');
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
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