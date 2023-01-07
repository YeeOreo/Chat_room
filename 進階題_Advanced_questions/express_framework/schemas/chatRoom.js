const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let chatRecord = new Schema(
    {
        user: {
            type: String,
            default: "",
        },
        say: {
            type: String,
            default: "",
        },
        time: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: "Chat Room", versionKey: false }
);

module.exports = mongoose.model("Chat Room", chatRecord);
