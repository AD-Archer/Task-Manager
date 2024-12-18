import express from 'express';
import models from '../models/task.js';
import sequelize from '../config/dbconn.js';

const router = express.Router();
const { Tasks } = models; // Destructure Tasks from models

// get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Tasks.findAll({
            attributes: ['id', 'title', 'description', 'completed'], // Specify exactly what we want
            order: [['createdAt', 'DESC']] // Order by newest first
        });
        
        res.render('index', { tasks }); 
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// Add a new task
router.post('/tasks', async (req, res) => {
    try {
        const { title, description } = req.body;
        
        // Check if task with same title exists
        const existingTask = await Tasks.findOne({ 
            where: { title }
        });

        if (existingTask) {
            return res.status(400).json({ 
                message: 'A task with this title already exists' 
            });
        }

        const task = await Tasks.create({ 
            title, 
            description,
            completed: false 
        });
        
        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(400).json({ 
            message: 'Error creating task', 
            error: error.message 
        });
    }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        
        const task = await Tasks.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ 
            message: 'Error deleting task', 
            error: error.message 
        });
    }
});

// Update a task
router.put('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description, completed } = req.body;

        const task = await Tasks.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if new title already exists (if title is being updated)
        if (title && title !== task.title) {
            const existingTask = await Tasks.findOne({ 
                where: { title }
            });
            
            if (existingTask) {
                return res.status(400).json({ 
                    message: 'A task with this title already exists' 
                });
            }
        }

        // Update only the fields that are provided
        const updates = {};
        if (title) updates.title = title;
        if (description !== undefined) updates.description = description;
        if (completed !== undefined) updates.completed = completed;

        await task.update(updates);
        
        const updatedTask = await Tasks.findByPk(taskId);
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(400).json({ 
            message: 'Error updating task', 
            error: error.message 
        });
    }
});

// Route handlers for authentication pages
router.get('/task-dashboard', async (req, res) => {
    try {
        const tasks = await Tasks.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.render('task_dashboard', { tasks });
    } catch (error) {
        console.error('Error loading dashboard:', error);
        res.status(500).render('error', { 
            message: 'Error loading dashboard' 
        });
    }
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

export default router;