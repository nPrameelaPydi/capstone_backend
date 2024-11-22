import express from 'express';
import Recipe from '../models/Recipe.js';
import User from '../models/User.js';

const router = express.Router();


// GET route to fetch all recipes with populated 'createdBy' field
router.get('/', async (req, res) => {
    try {
      // Fetch all recipes and populate the 'createdBy' field with 'name' from the User schema
      const recipes = await Recipe.find()
        .populate('createdBy', 'name'); // Populate 'name' field from the User model
  
      res.json(recipes);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching recipes', error: err.message });
    }
  });


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
        console.log("Request Body:", req.body);
        
        // Find user by name
        const user = await User.findOne({ name: createdBy });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }        

        // Create a new recipe
        const newrecipe = new Recipe({
            title,
            ingredients,
            instructions,
            createdBy: user._id, // Assign the user's ObjectId,
        });

        // Save the recipe to the database
        const savedrecipe = await newrecipe.save();
        res.status(201).json(savedrecipe);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating recipe', error });
    }
});


// DELETE route to remove a recipe by ID
router.delete('/:id', async (req, res) => {
    const recipeId = req.params.id;
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe deleted successfully', deletedRecipe });
    } catch (err) {
        console.log('Error deleting recipe:', err);
        res.status(500).json({ message: 'Error deleting recipe', error: err.message });
    }
});



export default router;