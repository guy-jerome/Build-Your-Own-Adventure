import express from 'express';
import {User,Adventure} from '../adventureSchema.js';

const router = express.Router();

// Create a new adventure
router.post('/', async (req, res) => {
    try {
        const newAdventure = new Adventure(req.body);
        const savedAdventure = await newAdventure.save();
        res.status(201).json(savedAdventure);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all adventures
router.get('/', async (req, res) => {
    try {
        const adventuresWithUsernames = await Adventure.aggregate([
            {
                $lookup: {
                    from: 'users', // The name of the collection to join with (case-sensitive)
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user' // Unwind the user array created by the $lookup stage
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    locations: 1,
                    username: '$user.username' // Include the username from the user document
                }
            }
        ]);

        res.status(200).json(adventuresWithUsernames);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific adventure by ID
router.get('/:id', async (req, res) => {
    try {
        const adventure = await Adventure.findById(req.params.id);
        if (!adventure) {
            return res.status(404).json({ message: 'Adventure not found' });
        }
        res.json(adventure);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get by adventure
router.get('/user/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const adventures = await Adventure.find({ userId: user._id });
        res.json(adventures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an adventure by ID
router.patch('/:id', async (req, res) => {
    try {
        const updatedAdventure = await Adventure.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAdventure) {
            return res.status(404).json({ message: 'Adventure not found' });
        }
        res.json(updatedAdventure);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete an adventure by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedAdventure = await Adventure.findByIdAndDelete(req.params.id);
        if (!deletedAdventure) {
            return res.status(404).json({ message: 'Adventure not found' });
        }
        res.json(deletedAdventure);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
