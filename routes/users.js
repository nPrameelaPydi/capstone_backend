import express from 'express';
import User from '../models/User.js';
import Recipe from '../models/Recipe.js';

const router = express.Router();

/**
 * GET /api/users/:userId/profile
 * @description Fetch a user's profile (user info && Recipes belongs to user)
 */
router.get('/:userId/profile', async (req, res) => {
    try{
        const userId = req.params.userId;
        //fetch user data
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        //fetch all recipes created by this user
        const recipes = await Recipe.find({createdBY: userId});
        //combine user data with their recipes
        res.json({user, recipes});
        
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Error fetching user profile', error: err.message });
    }
})

/**
 * GET /api/users
 * @description route to fetch users by id
 */
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
 * GET /api/users
 * @description route to fetch all users
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
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