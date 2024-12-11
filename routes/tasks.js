import express from 'express';
const router = express.router();
const Task = import('..models/task');

// get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

