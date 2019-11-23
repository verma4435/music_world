import jwt from "jsonwebtoken";
import { getEnvVariable } from "./envVariable";
import UserModel from "../model/UserModel";
export async function auth (req, res, next) {
    try {
        let userModel = new UserModel();
        const privateKey = getEnvVariable("JWT_SECRET_KEY");
    
        const token = req.headers.authorization.split(" ")[1];
        const tokenInfo = jwt.verify(token, privateKey);
        const user = await userModel.findUserById(tokenInfo._id);
        if ( !user ) {
            res.status(404).json({
                msg: "user not found"
            });
        }
        req.user = user;
    
        next();
    } catch (err) {
        res.status(401).json({
            msg: "token expired"
        })
        next("No Auth");
    }
}