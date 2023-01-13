import express from 'express';
import { loggedIn } from '../middleware/auth.middleware.js';
import {
    getAllUsers,
    createUser,
    getOneUser,
    updateUserWithToken,
    deleteUser,
    upadateUser
} from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', getAllUsers)
userRouter.get('/:userId', getOneUser )
userRouter.post('/new', createUser)
userRouter.put('/:userId', upadateUser)
userRouter.put('/tokenVerified', loggedIn, updateUserWithToken)
userRouter.delete('/:userId', deleteUser)

export default userRouter;