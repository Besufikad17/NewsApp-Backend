const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: Object,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    view: {
        type: Number,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Article', articleSchema);