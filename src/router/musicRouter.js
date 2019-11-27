import express from "express";

export default function createMusicRouter() {
    const musicRouter = express.Router();

    musicRouter.get("/upload", (req, res) => {
        res.send("ok");
    })
    return musicRouter;
}