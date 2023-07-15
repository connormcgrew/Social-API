const { Thought, User } = require('../models');

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
          const { username, thoughtText } = req.body;
      
          // Find the user based on the username
          const user = await User.findOne({ username });
      
          if (!user) {
            res.status(404).json({ message: 'No user found!' });
            return;
          }
      
          // Create the thought with the matching username
          const thought = await Thought.create({ username, thoughtText });
      
          // Add the thought to the user's thoughts
          user.thoughts.push(thought);
          await user.save();
      
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
          const { thoughtId, reactionId } = req.params;
      
          const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { _id: reactionId } } },
            { new: true }
          );
      
          if (!updatedThought) {
            res.status(404).json({ message: 'No thought found!' });
            return;
          }
      
          res.json(updatedThought);
        } catch (err) {
          console.log(err);
          res.sendStatus(500);
        }
      }
      
      
};

module.exports = thoughController;
