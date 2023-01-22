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
    getUser,
    resetUser,
    searchAllUsers,
    banUser
} from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/',loggedIn, getAllUsers)
userRouter.get('/searchByPattern',loggedIn, searchAllUsers)
userRouter.get('/you', loggedIn, getOneUser )
userRouter.get('/:id',getUser )
userRouter.put('/active',loggedIn, userIsActive)
userRouter.put('/like', loggedIn, like)
userRouter.put('/dislike', loggedIn, dislike)
userRouter.put('/edit', loggedIn, editUser)
userRouter.put('/reset', loggedIn, resetUser)
userRouter.post('/new', createUser)
userRouter.delete('/delete', loggedIn,deleteUser)
userRouter.delete('/ban', loggedIn,banUser)

export default userRouter;