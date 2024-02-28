const net = require('net');

const CRLF = '\r\n';

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const stringData = data.toString().split(CRLF);
        console.log('data', stringData);
        const requestType = stringData[1].split(' ')[1];
        const path = stringData[1].split(' ')[2];
        console.log(path);
        if (path == '/') {
            socket.write('HTTP/1.1 200 OK' + CRLF + CRLF);
        }
        else {
            socket.write('HTTP/1.1 404 NOT FOUND' + CRLF + CRLF);
        }
    })
    socket.on('close', () => {
        socket.end();
        server.close();
    });
});

server.listen(4221, 'localhost');
