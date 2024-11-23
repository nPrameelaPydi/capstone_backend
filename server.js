import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import {conn} from './db/conn.js';
import userRoutes from './routes/users.js';
import recipeRoutes from './routes/recipes.js';
import chatRoutes from './routes/chats.js';
import authRoutes from './routes/auth.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
conn();
const app = express();
const PORT = process.env.PORT || 3000;

//serve static files (uploaded images) 
// Get current directory path in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Food&Friends API');
})

//Error handler
app.use((error, req, res, next) => {
    res.status(500).json({error});
})

//Start server
app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`);
})