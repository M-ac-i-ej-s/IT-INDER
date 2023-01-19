import express from 'express';
import {
  addMessage,
  getMessage
} from '../controllers/message.controller.js'
import { loggedIn } from '../middleware/auth.middleware.js';

const messageRouter = express.Router();

messageRouter.post("/", loggedIn,addMessage);
messageRouter.get("/:conversationId",loggedIn, getMessage);

export default messageRouter