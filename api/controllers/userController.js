const User = require('../models/User');

// Get users (with optional userId filter)
const getUsers = async (req, res) => {
    try {
        const { userId } = req.query;
        const query = userId ? { userId } : {};
        const users = await User.find(query);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a user
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    createUser
};