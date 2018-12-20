let socket = io();

socket.on('connect', function () {
    console.log('Test');
});

let servers = new Set();
socket.emit('listServers', servers);
socket.on('servers', function(rooms) {
    let unique = [...new Set(rooms)]; 
    console.log('Rooms', unique);
})


socket.on('disconnect', function() {
    console.log('Disconnected from main page');
    // window.history.back();
    // history.pushState(null, "", location.href.split("?")[0]);
});




