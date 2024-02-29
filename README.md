# NodeJS simple HTTP server implementation

Creates a http server that responds to GET and POST request.

## Requests:
   GET http://localhost:4221/ : responds with 200 OK status.
   
   GET http://localhost:4221/echo/sometext : responds 'sometext' in the body with 200 OK status.
   
   GET http://localhost:4221/user-agent : responds with the user-agent value (200 OK).

   For testing the read write files execute the app/main.js with --directory flag:
   
   (example)   node app/main.js --directory ./data 
   
   in this case data folder must exists.
      
   GET http://localhost:4221/files/file.txt : reads the content of file.txt and responds with it in the body (200 OK).
   
   POST http://localhost:4221/files/file.txt : copies the content of the request body in file.txt (201 CREATED).

   In other cases responds with 404 NOT FOUND.
