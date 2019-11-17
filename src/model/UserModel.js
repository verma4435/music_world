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
     * createUser - function to create the user in the users collections
     * 
     * @param {*} userInfo 
     */
    async createUser(userInfo) {
        try {
            const chkUser = await this.model.findOne({ email: userInfo.email });
            if ( chkUser ) {
                return "User already Present in the system";
            }

            const user = await this.model.create(userInfo);
            const token = await this.generateAuthToken(user);

            if ( !token ) {
                throw new Error("Unable to generate Token");
            } 

            return {
                user,
                token
            };
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    /**
     * generateAuthToken - function to genrate and store token for a user
     * 
     * @param {*} user 
     */
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

    /**
     * findUserByCredentials - function to find the user as per the credials
     * 
     * @param {*} userInfo 
     */
    async findUserByCredentials(userInfo) {
        const chkUser = await this.model.findOne({ email: userInfo.email });
        if ( !chkUser ) {
            return "User NOt found";
        }

        if ( userInfo.password == chkUser.password ) {
            const token = await this.generateAuthToken(chkUser);
            return {
                message: "User Found",
                token
            }
        } else {
            return false;
        }

    }

    /**
     * updateUser - function to update a user info
     * @param {*} user 
     * @param {*} userInfo 
     */
    async updateUser(user, userInfo) {
        try {
            const updateUserStatus = await this.model.findOneAndUpdate({_id: user._id} , userInfo, { new: true });
            return updateUserStatus;
        } catch (err) {
            console.log("update", err);
            return null;
        }

    }

    /**
     * findUserById - function to find the user by id
     * 
     * @param {*} userId 
     */
    async findUserById(userId) {
        try {
            console.log(userId);
            const user = await this.model.findById(userId);
            if (!user) {
                return "User NOt found";
            }
            return user;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}