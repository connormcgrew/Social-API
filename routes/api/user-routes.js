const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');
const { create } = require('../../models/User');
// Set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post((req, res) => {
        const { username, email } = req.body;
        const userData = { username, email, thoughts: [], friends: [] };
        create(userData)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    });
// Set up GET one, PUT, and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);
module.exports = router;

// /api/users

// GET all users

// GET a single user by its _id and populated thought and friend data

// POST a new user:

// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
// PUT to update a user by its _id

// DELETE to remove user by its _id

// BONUS: Remove a user's associated thoughts when deleted.