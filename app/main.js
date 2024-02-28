const net = require('net');

const CRLF = '\r\n';

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const dataArray = data.toString().split(CRLF);
        console.log('DATA: ', dataArray);
        const requestType = dataArray[0].split(' ')[0];
        const args = dataArray[0].split(' ')[1];
        // console.log(args);
        const userAgent = dataArray[2].split(' ')[1]
        if (args.startsWith('/echo/')) {
            socket.write('HTTP/1.1 200 OK' + CRLF + 'Content-Type: text/plain' + CRLF + 'Content-Length: ' + args.slice('/echo/'.length, args.length).length + CRLF + CRLF + args.slice('/echo/'.length, args.length));
        }
        if (args == '/user-agent') {
            socket.write('HTTP/1.1 200 OK' + CRLF + 'Content-Type: text/plain' + CRLF + 'Content-Length: ' + userAgent.length + CRLF + CRLF + userAgent)
        }
        else if (args == '/') {
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
