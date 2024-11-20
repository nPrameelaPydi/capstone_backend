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

/**
 * POST /api/recipes
 * @description create a new Recipe
 */
router.post('/', async (req, res) => {
    try {
        const { title, ingredients, instructions, createdBy } = req.body;        
        // Create a new recipe
        const newrecipe = new Recipe({
            title,
            ingredients,
            instructions,
            createdBy,
        });
        // Save the recipe to the database
        const savedrecipe = await newrecipe.save();
        res.status(201).json(savedrecipe);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating recipe', error });
    }
})



export default router;