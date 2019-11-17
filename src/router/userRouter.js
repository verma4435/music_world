import express from 'express';
import  * as userController  from "../controller/userController";

export default function createUserRouter() {
    const userRouter = express.Router();
    userRouter.get("/", ( req, res) => {
        res.send("ok");
    })

    //user register
    userRouter.post('/register',userController.register);

    //user login
    userRouter.post('/login', userController.login);

    return userRouter;
}