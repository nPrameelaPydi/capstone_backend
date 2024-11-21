import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

/**
 * /api/auth/register
 * @description User Registration route
 */
router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try{
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



export default router;