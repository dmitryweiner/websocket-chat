const WebSocketServer = require('websocket').server;
const http = require('http');
let connections = [];

const server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});
server.listen(1337, function() { });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log(message.utf8Data);
            // process WebSocket message
            connections.map((element) => {
                element.sendUTF(message.utf8Data);
            });
        }
    });

    connection.on('close', function(connection) {
        // close user connection
        connections = connections.filter((element) => element !== connection);
    });

    connections.push(connection);
});