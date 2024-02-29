const net = require('net');
const fs = require('fs');
const path = require('path');

const CRLF = '\r\n';

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const dataArray = data.toString().split(CRLF);
        console.log('DATA: ', dataArray);
        const requestType = dataArray[0].split(' ')[0];
        const args = dataArray[0].split(' ')[1];
        const userAgent = dataArray[2].split(' ')[1];

        if (requestType == 'GET') {
            if (args.startsWith('/echo/')) {
                const echoValue = args.slice('/echo/'.length);
                socket.write(
                    'HTTP/1.1 200 OK' +
                        CRLF +
                        'Content-Type: text/plain' +
                        CRLF +
                        'Content-Length: ' +
                        echoValue.length +
                        CRLF +
                        CRLF +
                        echoValue
                );
                return socket.end();
            }
            if (args == '/user-agent') {
                socket.write(
                    'HTTP/1.1 200 OK' +
                        CRLF +
                        'Content-Type: text/plain' +
                        CRLF +
                        'Content-Length: ' +
                        userAgent.length +
                        CRLF +
                        CRLF +
                        userAgent
                );
                return socket.end();
            }
            if (args.startsWith('/files/')) {
                const fileName = args.slice('/files/'.length, args.length);
                const filePath = path.resolve(process.argv[3], fileName);
                if (fs.existsSync(filePath)) {
                    const fileContent = fs.readFileSync(filePath);
                    socket.write(
                        'HTTP/1.1 200 OK' +
                            CRLF +
                            'Content-Type: application/octet-stream' +
                            CRLF +
                            'Content-Length: ' +
                            fileContent.length +
                            CRLF +
                            CRLF +
                            fileContent
                    );
                    return socket.end();
                } else {
                    socket.write('HTTP/1.1 404 NOT FOUND' + CRLF + CRLF);
                    return socket.end();
                }
            }
            if (args == '/') {
                socket.write('HTTP/1.1 200 OK' + CRLF + CRLF);
                return socket.end();
            }
        }
        if (requestType == 'POST') {
            if (args.startsWith('/files/')) {
                const fileContent = dataArray[6];
                const fileName = args.slice('/files/'.length);
                const filePath = path.resolve(process.argv[3], fileName);
                fs.writeFileSync(fileContent);
                socket.write('HTTP/1.1 201 CREATED' + CRLF + CRLF);
                socket.end();
            }
        }
        else {
            socket.write('HTTP/1.1 404 NOT FOUND' + CRLF + CRLF);
        }
    });
    socket.on('close', () => {
        socket.end();
        server.close();
    });
});

server.listen(4221, 'localhost');
console.log('PROCESS.ARGV: ', process.argv);
