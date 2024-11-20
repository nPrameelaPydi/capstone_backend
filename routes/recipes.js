import express from 'express';
import Recipe from '../models/Recipe.js';

const router = express.Router();

/**
 * GET /api/recipes
 * @description GET route to fetch all recipes
 */
router.get('/', async (req, res) => {
    try{
        const recipes = await Recipe.find();
        res.json(recipes);
    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
})

/**
 * GET /api/recipes/id
 * @description GET route to fetch recipe by id
 */
router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const recipes = await Recipe.findById({id});
        res.status(201).json(recipes);
    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
})



export default router;