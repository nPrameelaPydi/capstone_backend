import express from 'express';
const router = express.Router();

/**
 * GET /users
 * @description Return all users
 */
router.get('/', (req, res) => {
    res.send('Hello from users');
})

export default router;