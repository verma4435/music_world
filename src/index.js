import express from "express";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

// app server setup
app.listen(
    process.env.PORT,
    () => {
        console.log(`server running ${process.env.PORT}`);  
    }
);