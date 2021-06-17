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
    score: {
        type: Number,
        default: 0,
    },
    report_tag:{
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Article', articleSchema);