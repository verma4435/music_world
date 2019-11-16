import express from "express";
import { createUserRouter } from "./router/userRouter";
export async function createRouter() {
    const route = express.Router();
    route.get('/', (req,res) => {
        res.send("ok");
    })
    console.log("-------")
    console.log(route);
    //user routes
    route.post('/users/register', (req, res) => {
        console.log(req.body)
        res.send("ok")
    })
    route.use('/users', createUserRouter);

    //return route
    return route;
}