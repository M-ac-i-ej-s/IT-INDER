import express from 'express';
import { loggedIn } from '../middleware/auth.middleware.js';
import {
    getAllUsers,
    createUser,
    getOneUser,
    deleteUser,
    userIsActive,
    like,
    dislike,
    editUser,
    firstTime,
    getUser,
    resetUser
} from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/',loggedIn, getAllUsers)
userRouter.get('/you', loggedIn, getOneUser )
userRouter.get('/:id',getUser )
userRouter.put('/active',loggedIn, userIsActive)
userRouter.put('/like', loggedIn, like)
userRouter.put('/dislike', loggedIn, dislike)
userRouter.put('/edit', loggedIn, editUser)
userRouter.put('/reset', loggedIn, resetUser)
userRouter.put('/firstTime', loggedIn, firstTime)
userRouter.post('/new', createUser)
userRouter.delete('/delete', loggedIn,deleteUser)

export default userRouter;