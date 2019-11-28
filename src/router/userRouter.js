import express from 'express';
import  * as userController  from "../controller/userController";
import { auth } from "../utils/auth";
import { 
    uploadPhoto,
    uploadMusic
} from '../utils/upload';

/**
 * createUserRouter - function to use to create route for the users related actions
 */
export default function createUserRouter() {
    const userRouter = express.Router();
    userRouter.get("/", ( req, res) => {
        res.send("ok");
    })

    //user register
    userRouter.post('/register',userController.register);

    //user login
    userRouter.post('/login', userController.login);

    //user update profile
    userRouter.post('/updateProfile', auth, userController.updateProfile);

    //users upload profile pic
    userRouter.post('/uploadProfilePic', [ auth, uploadPhoto.single('image') ],  userController.uploadProfilePic);

    return userRouter;
}