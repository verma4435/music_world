import express from "express";
import createRouter from "./router";
import { getEnvVariable } from "./utils/envVariable";
import bodyParser from "body-parser";

//app setup
const app = express();

//bodyParser setup
app.use(bodyParser.json());

//router setup
app.use(createRouter());

// app server setup
const port = getEnvVariable('PORT');

//listen to server port
app.listen(
    port,
    () => {
        console.log(`server running ${port}`);  
    }
);