var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
require('models/Tasks');
const Task = mongoose.model('tasks');

router.get('/tasks', async (req, res) => {
    const filter = {};
    const tasks = await Task.find(filter);
    res.json(tasks);
});

router.get('/', (req, res) => {
    res.send('RootAPI route')
    alert("hello")
});

//Update a task in the databade
router.patch('/tasks/:id', async (req, res) => {
    console.log(req.params.id);

    //use mongoose schema for task; "findOneAndUpdate"
    const filter = { id: parseInt(req.params.id) };
    const updateDate = req.body;
    const updatedDoc = await Task.findOneAndUpdate(filter, updateDate, {new: true});
    console.log(updatedDoc);

    res.status(200);
    res.json({updated_task: parseInt(req.params.id)});
});

module.exports = router;
