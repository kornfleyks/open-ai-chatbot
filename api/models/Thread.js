const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    role: String,
    content: String,
    timestamp: String
});

const threadSchema = new mongoose.Schema({
    threadId: String,
    threadTitle: String,
    timestamp: String,
    messages: [messageSchema]
});

const userDataSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    threads: [threadSchema]
});

module.exports = mongoose.model('UserData', userDataSchema, 'threads');