import BaseModel from "./BaseModel";
import userSchema from "../schema/userSchema";
import jwt from "jsonwebtoken";
import { getEnvVariable } from "../utils/envVariable";

const privateKey = getEnvVariable("JWT_SECRET_KEY");
export default class UserModel extends BaseModel {
    constructor(connection) {
        super('user', connection);
        this.schema = userSchema;
        this.name = 'user';
        this.model = this.connection.model(this.name, this.schema);
    }

    /**
     * createUser function to create the user in the users collections
     * @param {*} userInfo 
     */
    async createUser(userInfo) {
        try {
            console.log("userinfo",userInfo);
            const user = await this.model.create(userInfo);
            const token = await this.generateAuthToken(user);
            if (!token) {
                throw new Error("Unable to generate Token");
            } 
            return user;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async generateAuthToken(user) {
        try{
            const token = await jwt.sign(
                { _id: user._id }, 
                privateKey
            );
            user.tokens = user.tokens.concat({ token });
            await user.save();
            return token;
        } catch (err) {
            console.log(err);
            return null;
        }

    }
}