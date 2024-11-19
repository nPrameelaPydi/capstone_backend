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
router.get('/id', async (req, res) => {
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
 * @description Returns all users
 */












export default router;