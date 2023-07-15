const { Thought } = require('../models');

const thoughController = {

    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        }
    },

    getThoughtById: async (req, res) => {
        try {
            const thought = await Thought.findOne({ _id: req.params.id });
            res.json(thought);
            if (!thought) {
                res.status(404).json({ message: 'No thought found!' });
                return;
            }
        
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        }
    },

    createThought: async (req, res) => {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        }

    },

    updateThought: async (req, res) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true }
            );
            res.json(thought);
            if (!thought) {
                res.status(404).json({ message: 'No thought found!' });
                return;
            }
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        }
    },
    
    deleteThought: async (req, res) => {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id });
            res.json(thought);
            if (!thought) {
                res.status(404).json({ message: 'No thought found!' });
                return;
            }
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        }
    },

    addReaction: async (req, res) => {1
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true }
            );
            res.json(thought);
            if (!thought) {
                res.status(404).json({ message: 'No thought found!' });
                return;
            }
        }
        catch (err) {
            console.log(err);
            res.sendStatus(400);
        }
    },

    deleteReaction: async (req, res) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            res.json(thought);
            if (!thought) {
                res.status(404).json({ message: 'No thought found!' });
                return;
            }
        }
        catch (err) {
            console.log(err);
            res.sendStatus(400);
        }
    }
};

module.exports = thoughController;
