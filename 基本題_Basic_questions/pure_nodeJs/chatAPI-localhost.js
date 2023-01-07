// chatAPI.js which using Pure Node.js without Express framework.
const http = require("http");
const url = require("url");
const fs = require("fs");
const { log } = require("console");
const port = 3000;

let chatRecords = new Array();

http.createServer(function (req, res) {
    let path = url.parse(req.url, true).pathname;
    console.log("Request:" + path);
    /* GET home page. */
    if (path == "/") {
        fs.readFile("index.html", function (err, data) {
            res.writeHead(200, { "Content-Type": "text/html" });
            console.log(`listening to port ${port}`);
            return res.end(data);
        });
    } else if (path == "/chat") {
        console.log(req.url);
        let person = url.parse(req.url, true).query;
        if (person.user == "" && person.say == "" && chatRecords.length == 0) {
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end("");
        }

        if (person.user != "" && person.say != "") {
            let timeStamp = new Date();
            person.time = timeStamp.toLocaleString();
            chatRecords.push(person);
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(chatRecords));
    } else if (path == "/save") {
        // TODO
    } else if (path == "/reload") {
        // TODO
    } else if (path == "/chat/clear") {
        chatRecords.length = 0;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end();
    } else {
        res.end();
    }
}).listen(port);
