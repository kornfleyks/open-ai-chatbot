const Fixer = require('../models/Fixer');

const searchFixers = async (query) => {
    try {
        console.log('Searching for:', query); // Debug log
        const fixers = await Fixer.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });
        console.log('Found results:', fixers); // Debug log
        return fixers;
    } catch (error) {
        console.error('Error searching fixers:', error);
        throw error;
    }
};

module.exports = { searchFixers };