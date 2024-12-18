const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    full: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    settings: {
        type: Object,
        default: {}
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);