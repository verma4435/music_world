import express from 'express';
import  * as userController  from "../controller/userController";
import { auth } from "../utils/auth";

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
    return userRouter;
}