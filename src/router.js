import express from "express";
import createUserRouter from "./router/userRouter";
import createMusicRouter from "./router/musicRouter";

export default function createRouter() {
    const router = express.Router();

    //users related router setup
    router.use('/users', createUserRouter());

    //music related router setup
    router.use("/music", createMusicRouter());

    //router for all routes
    router.all('*', ( req, res ) => {
        res.status(404).json({
            message: "page not found"
        })
    })
    //return router
    return router;
};