import express from 'express';
import Recipe from '../models/Recipe.js';
import User from '../models/User.js';
import multer from 'multer';
//import path from 'path';


const router = express.Router();


// Search recipes by title
router.get('/search', async (req, res) => {
  const { title } = req.query;
  try {
      if (!title) {
          return res.status(400).json({ message: 'Title query parameter is required' });
      }

      //case-insensitive search using a regular expression
      const recipes = await Recipe.find({
          title: { $regex: title, $options: 'i' }
      });

      res.json(recipes);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
});


// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Path where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname); // Timestamp + file name
  },
});

const upload = multer({ storage: storage });

// POST route for image upload
router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Construct image URL
    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;

    // Send back the image filename or URL
    res.status(200).json({ message: 'Image uploaded successfully', imageUrl: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading image', error });
  }
}); 


// GET route to fetch all recipes with populated 'createdBy' field
router.get('/', async (req, res) => {
    try {
      // Fetch all recipes and populate the 'createdBy' field with 'name' from the User schema
      const recipes = await Recipe.find()
        .populate('createdBy', 'name'); // Populate 'name' field from the User model

        console.log(recipes);
  
      res.json(recipes);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching recipes', error: err.message });
    }
  });


/**
 * GET /api/recipes/id
 * @description GET route to fetch recipe by id
 */
router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const recipes = await Recipe.findById(id);
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
        const { title, ingredients, instructions, createdBy, image } = req.body;
        console.log("Request Body:", req.body);
        
        // Find user by name
        const user = await User.findOne({ name: createdBy });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }        

        // Create a new recipe
        const newrecipe = new Recipe({
            title,
            ingredients,
            instructions,
            createdBy: user._id, // Assign the user's ObjectId,
            image,
        });

        // Save the recipe to the database
        const savedrecipe = await newrecipe.save();
        res.status(201).json(savedrecipe);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating recipe', error });
    }
});


// PATCH route to update a recipe
router.patch('/:id', upload.single('image'), async (req, res) => {
  try {
      const recipeId = req.params.id;

      const updateData = { ...req.body }; 
      if(req.file) {
        console.log(`////////////////////////////////`)
        console.log("Image file path:", `/uploads/${req.file.filename}`);

        //if image is uploaded, include in updateData
        updateData.image = `/uploads/${req.file.filename}`;
      }

      console.log("Update data:", updateData);
      console.log(`/////////////////////////////////////////`)

      // Find the recipe and update it
      const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updateData, {
          new: true,         // Return the updated recipe
          runValidators: true // Run validation for the updated fields
      }).populate('createdBy');

      if (!updatedRecipe) {
          return res.status(404).json({ message: 'Recipe not found' });
      }
      res.json(updatedRecipe);// Return the updated recipe

  } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error updating recipe', error: err.message });
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