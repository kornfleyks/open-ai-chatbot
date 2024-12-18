const mongoose = require('mongoose');

const fixerSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Fixer', fixerSchema, 'fixer-data'); // Specify the collection name 'fixer-data'