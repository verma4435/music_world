import express from "express";

export async function createRouter() {
    const route = express.Router();

    route.get("/",(req, res) => {
        res.send("llkkl");
    })
    return route;
}