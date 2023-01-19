import express from 'express';
import {
    newConversation,
    getConversation,
} from '../controllers/conversation.controller.js'
import { loggedIn } from '../middleware/auth.middleware.js';

const conversationRouter = express.Router();

conversationRouter.post("/",loggedIn, newConversation );
conversationRouter.get("/yours",loggedIn, getConversation);

export default conversationRouter