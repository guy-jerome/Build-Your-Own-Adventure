import express from 'express';
import {User} from '../adventureSchema.js';

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
    try {
        if (!req.body.username || typeof req.body.username !== 'string' || req.body.username.trim() === '') {
            return res.status(400).json({ message: "Username is required and must be a non-empty string" });
        }
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get user by Name
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if(user.password !== req.body.password){
            return res.status(401).json({ message: 'Incorrect Password' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user by ID
router.patch('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router