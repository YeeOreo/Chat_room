// chatAPI.js which using Express framework and it deployed on Cyclic also connect to the database which is cloud based MongoDB Atlas.
// localhost 3000 will be used after running "npm start", or you can change the port number in "bin/www".
const express = require("express");
const ChatRecord = require("../schemas/chatRoom");
const router = express.Router();

let chatRecords = new Array();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.get("/chat", function (req, res, next) {
    let person = req.query;
    console.log(person);
    if (person.user == "" && person.say == "" && chatRecords.length == 0) {
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        return res.send("");
    }

    if (person.user != "" && person.say != "") {
        let timeStamp = new Date();
        person.time = timeStamp.toLocaleString();
        chatRecords.push(person);
    }

    console.log(chatRecords);
    res.status(200).json(chatRecords);
});

router.get("/chat/clear", function (req, res, next) {
    chatRecords.length = 0;
    res.status(200);
    res.setHeader("Content-Type", "text/html");
    res.send("");
});

router.get("/chat/reload", async function (req, res, next) {
    try {
        const loadChatRecords = await ChatRecord.find();
        for (person of loadChatRecords) {
            let time = person.time.toLocaleString();
            chatRecords.push({
                user: person.user,
                say: person.say,
                time: time,
            });
        }

        console.log(chatRecords);
        res.json(chatRecords);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/chat/save", async function (req, res, next) {
    let passChatRecords = new Array();
    for (person of chatRecords) {
        passChatRecords.push(
            new ChatRecord({
                user: person.user,
                say: person.say,
                time: person.time,
            })
        );
    }
    const resultChatRecords = await passChatRecords.forEach((item) =>
        new ChatRecord({
            user: item.user,
            say: item.say,
            time: item.time.toISOString(),
        }).save()
    );
    res.status(201).json(resultChatRecords);
});

module.exports = router;
