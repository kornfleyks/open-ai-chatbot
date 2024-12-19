const express = require('express');
const router = express.Router();
const UserData = require('../models/Thread');

// Get user data
router.get('/:username', async (req, res) => {
    try {
        const userData = await UserData.findOne({ username: req.params.username });
        console.log('GET request for username:', req.params.username);
        console.log('Found userData:', userData);
        res.json(userData || { threads: [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user data
router.post('/', async (req, res) => {
    try {
        const { username, threads } = req.body;
        // Try direct save first
        let userData = await UserData.findOne({ username });
        if (!userData) {
            userData = new UserData({ username, threads });
        } else {
            userData.threads = threads;
        }   
        const savedData = await userData.save();
        res.json(savedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;