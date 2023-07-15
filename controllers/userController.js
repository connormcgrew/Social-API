const { User } = require('../models');

 const userController = {

getAllUsers: async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
},

getUserById: async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        res.json(user);
        if (!user) {
            res.status(404).json({ message: 'No user found!' });
            return;
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
},

createUser: async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }

},

updateUser: async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        res.json(user);
        if (!user) {
            res.status(404).json({ message: 'No user found!' });
            return;
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
},

deleteUser: async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });
        res.json(user);
        if (!user) {
            res.status(404).json({ message: 'No user found!' });
            return;
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
},

addFriend: async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        res.json(user);
        if (!user) {
            res.status(404).json({ message: 'No user found!' });
            return;
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }

},

removeFriend: async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        res.json(user);
        if (!user) {
            res.status(404).json({ message: 'No user found!' });
            return;
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}


};

module.exports = userController;

