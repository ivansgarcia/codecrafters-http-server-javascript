const net = require('net');

const CRLF = '\r\n';

const server = net.createServer((socket) => {
    socket.on(() => {
        socket.write('HTTP/1.1 200 OK' + CRLF + CRLF);
    })
    socket.on('close', () => {
        socket.end();
        server.close();
    });
});

server.listen(4221, 'localhost');
