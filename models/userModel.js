const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registerd_date: {
        type: Date,
        default: Date.now
    },
    articles: {
        type:Array,
        default: []
    },
    notifications: {
        type:Array,
        default: []
    },
    settings: {
        type:Array,
        default: []
    },
});

module.exports = mongoose.model("User", userSchema);