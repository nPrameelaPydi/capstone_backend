import express from 'express';
import User from '../models/User.js';

const router = express.Router();

/**
 * GET /api/users
 * @description Returns all users
 */
// GET route to fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});
// GET route to fetch users by id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const users = await User.findById({id});
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});


/**
 * POST /api/users
 * @description create a new User
 */
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        // Create a new user
        const newUser = new User({
            name,
            email,
            password,
        });
        // Save the user to the database
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating user', error });
    }
});



export default router;