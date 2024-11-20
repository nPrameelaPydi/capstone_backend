import { Schema, model } from "mongoose";
//import validator from "validator";

const recipeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"], // Custom error message
    minlength: [3, "Title must be at least 3 characters long"],
    index: true, // Index title for quick searching by title
  },
  ingredients: {
    type: [String], // Array of strings
    required: [true, "Ingradients are required"],
    //validate: {
    //  validator: function (arr) {
    //    return arr.length > 0;
    //  },
    //  message: "There must be at least one ingradient",
    //},
  },
  instructions: {
    type: String,
    required: [true, "Instructions are required"],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "CreatedBy (user ID) is required"],
    index: true, // Index for filtering recipes by author
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true, //unchangeable after it's initially set
    index: true, // Index for sorting recipes by creation date
  },
});

export default model("Recipe", recipeSchema);
