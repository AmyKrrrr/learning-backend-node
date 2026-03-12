const http = require('http');
const fs = require('fs');
const url = require('url');

// CREATE Web server
const myServer = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()}: ${req.method} ${req.url} New Req Recieved\n`;
    const myUrl = url.parse(req.url, true);
    // query: [Object: null prototype] { myname: 'amy', userId: '9027' }
    // console.log(myUrl);
    fs.appendFile('log.txt', log, (err, data) => {
        switch(myUrl.pathname){
            case "/":
                res.end("HomePage");
                break;
            case "/about":
                res.end("AboutPage");
                break;
            case "/signup":
                if(req.method === "GET") res.end("This is a signup Form");
                else if(req.method === "POST") res.end("Success");
            default:
                res.end("404 Not Found");
        }
    })
});

// Server ko run karne ke liye port ki zarurat padti hai (listen)
myServer.listen(8000, () => console.log('Server Started')); 