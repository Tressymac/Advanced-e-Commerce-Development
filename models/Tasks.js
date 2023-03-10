const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema 
const TasksSchema = new Schema ({
    id: {
        type: Number,
        required: true
    },

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    lane: {
        type: Number,
        required: true
    }
    }
);

mongoose.model('tasks', TasksSchema);