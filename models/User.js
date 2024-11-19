
import { Schema, model } from 'mongoose';
//import validator from 'validator';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate emails
        //validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model('User', userSchema);
