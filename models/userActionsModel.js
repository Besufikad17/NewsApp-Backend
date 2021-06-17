const mongoose = require('mongoose');

const userActionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    action_type: {
        type: String,
        required: true
    },
    object_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('UserAction', userActionSchema);