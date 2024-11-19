import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import {conn} from './db/conn.js';
import userRoutes from './routes/users.js'

dotenv.config();
conn();
const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to my API');
})

//Error handler
app.use((error, req, res, next) => {
    res.status(500).json({error});
})

//Start server
app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`);
})