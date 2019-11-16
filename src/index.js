import express from "express";
import { createRouter } from "./router";
import { getEnvVariable } from "./utils/envVariable";
import bodyParser from "body-parser";
const app = express();
// app.use(express.json());
app.use(bodyParser.json());
app.use(createRouter);
// app server setup
const port = getEnvVariable('PORT');
app.listen(
    port,
    () => {
        console.log(`server running ${port}`);  
    }
);