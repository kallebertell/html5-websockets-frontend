/* jshint devel:true */
console.log('\'Allo \'Allo!');

// var socket = new WebSocket("ws://localhost:8080/");
var socket = new WebSocket('ws://localhost:8080/', 'echo-protocol');

socket.onopen = function () {
    socket.send("register;test");
};

socket.onmessage = function(msg) {
    console.log(msg);
}

socket.onclose = function(){
    alert('Server connection failure. Only offline mode.');
    socket = undefined;
}

socket.onerror = function(){
    alert('Server connection failure. Only offline mode.');
    socket = undefined;
}
