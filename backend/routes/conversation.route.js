import express from 'express';
import {
    newConversation,
    getConversation,
    deleteConversation
} from '../controllers/conversation.controller.js'
import { loggedIn } from '../middleware/auth.middleware.js';

const conversationRouter = express.Router();

conversationRouter.post("/",loggedIn, newConversation );
conversationRouter.get("/yours",loggedIn, getConversation);
conversationRouter.delete("/delete",loggedIn, deleteConversation);

export default conversationRouter