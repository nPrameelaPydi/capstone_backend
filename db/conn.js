import mongoose from 'mongoose'

export async function conn() {
    try{
        const conn= await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to MongoDB ${conn.connections[0].name}`);
    }catch(e){
        console.error(`Error connecting to MongoDB: ${e.message}`);
    }
}