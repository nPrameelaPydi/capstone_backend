import express from 'express';
import dotenv from 'dotenv';
import {conn} from './db/conn.js';

dotenv.config();
conn();
const app = express();
const PORT = process.env.PORT || 3000;

//Routes
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