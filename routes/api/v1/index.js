var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
require('models/Tasks');
const Task = mongoose.model('tasks');

// Root route
router.get('/', (req, res) => {
    res.send('Root API route');
});

// Getting all tasks in database
router.get('/tasks', async (req, res) => {
    setTimeout(async function() {
        const filter = {};
        const tasks = await Task.find(filter);
        console.log(tasks);
        res.json(tasks);
    }, 3000);
});

//Update a task in the databade
router.patch('/tasks/:id', async (req, res) => {
    console.log(req.params.id);

    // Use Mongoose schema for Task; "findOneAndUpdate"
    const filter = {id: parseInt(req.params.id)};
    const updateData = req.body;
    const updatedDoc = await Task.findOneAndUpdate(filter, updateData, { new: true });
    console.log(updatedDoc);

    res.status(200);
    res.json({ updated_task: parseInt(req.params.id)});
});

module.exports = router;
