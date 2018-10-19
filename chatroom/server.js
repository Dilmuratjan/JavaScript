var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};
var chatServer = require('./lib/chat_server');

function send404(response) {
    console.log(`[server] -- send404`);
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error 404: response not found.');
    response.end();
}

function sendFile(response, filePath, fileContents) {
    console.log(`[server] -- sendFile`);
    response.writeHead(200, { 'Content-Type': mime.lookup(path.basename(filePath)) });
    response.end(fileContents);
}

function serverStatic(response, cache, absPath) {
    console.log(`[server] -- serverStatic`);
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function(exists) {
            if (exists) {
                fs.readFile(absPath, function(err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                send404(response);
            }
        });
    }
}

var server = http.createServer(function(request, response) {
    var filePath = false;

    if (request.url == '/') {
        filePath = 'public/index.html';
    } else {
        filePath = 'public/index.html';
    }

    var absPath = './' + filePath;
    console.log(absPath)
    serverStatic(response, cache, absPath);
});

server.listen(8888, function() {
    console.log("Server listening on http://localhost:8888 ...");
});

chatServer.listen(server);