import express from 'express';
import {
  addMessage,
  getMessage,
  deleteMessages,
  deleteMessage
} from '../controllers/message.controller.js'
import { loggedIn } from '../middleware/auth.middleware.js';

const messageRouter = express.Router();

messageRouter.post('/', loggedIn,addMessage);
messageRouter.get('/:conversationId',loggedIn, getMessage);
messageRouter.delete('/delete',loggedIn, deleteMessages);
messageRouter.put('/:messageId',loggedIn, deleteMessage);

export default messageRouter