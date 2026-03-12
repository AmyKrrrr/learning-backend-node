const http = require('http');
const fs = require('fs');

// CREATE Web server
const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New Req Recieved\n`;
    fs.appendFile('log.txt', log, (err, data) => {
        switch(req.url){
            case "/":
                res.end("HomePage");
                break;
            case "/about":
                res.end("AboutPage");
                break;
            default:
                res.end("404 Not Found");
        }
    })
});

// Server ko run karne ke liye port ki zarurat padti hai (listen)
myServer.listen(8000, () => console.log('Server Started')); 