const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    gender: {
        type: String,
        required: [true, 'gender is required']
    },
    username: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        minlength: 7,
        maxlength: 16,
        required: [true, 'email is required']
    },
    articles: Array,
    notifications: Array,
    settings: Array,
});

module.exports = mongoose.model("User", userSchema);