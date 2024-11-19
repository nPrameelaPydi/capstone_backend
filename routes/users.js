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










export default router;