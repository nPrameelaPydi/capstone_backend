import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

/**
 * /api/auth/register
 * @description User Registration route
 */
router.post('/register', async (req, res) => {    
    try{
        const {name, email, password} = req.body;
        console.log(req.body);
        
        //check if email already registered
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: `Email already registered`});
        }
        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create and save the new user
        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});

    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error registering user', err });
    }
});

/**
 * /api/auth/login
 * @description User Login route
 */
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try{
        // find the user by email
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        //compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({message: 'Login Successful', userId: user._id, name: user.name});

    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error logging in', err });
    }
})



export default router;