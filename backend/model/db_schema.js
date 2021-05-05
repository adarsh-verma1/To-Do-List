const mongoose = require('mongoose');
const name = 'ToDoApp';
const Schema = mongoose.Schema;

// Creating Schema for Database
const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

mongoose.model(name, todoSchema);
module.exports = { name };