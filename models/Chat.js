import mongoose from "mongoose";

const chatsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    messages: [{ role: String, content: String }],
  },
  { timestamps: true },
);


const Chats = mongoose.model('Chats', chatsSchema);
export default Chats;