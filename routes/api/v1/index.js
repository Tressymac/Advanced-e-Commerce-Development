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

module.exports = router;
