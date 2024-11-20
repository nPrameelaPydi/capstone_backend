import express from "express";
import Chats from "../models/Chat.js";

const router = express.Router();

/**
 * GET /api/chats
 * @description Return all chats
 */
router.get("/", async (req, res, next) => {
  try {
    const chats = await Chats.find();
    res.json(chats);
  } catch (e) {
    console.error(e);
  }
});


/**
 * GET /api/:id
 * @description return a single chat by the id
 */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const chat = await Chats.findById({ id });
    res.json({ chat });
  } catch (e) {
    console.error(e);
  }
});

/**
 * POST /api/chats/
 * @description create a new chat
 */
router.post('/', async (req, res, next) => {
    try {
        const newChat = await new Chats({title: "New Chat"});
        await newChat.save();
        res.status(201).json({newChat});
    } catch (e) {
        console.error(e);
        
    }
});

/**
 * POST /api/chats/:id/msg
 * @description adds a new msg in a chat
 */
router.post('/:id/message', async (req, res) => {
  try {
    const { id } = req.params;
   
    // Find the chat by ID
    const chat = await Chats.findById(id);

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // Add the new message to the `messages` array
    chat.messages.push(req.body);

    // Save the updated chat
    await chat.save();

    res.status(201).json(chat);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;