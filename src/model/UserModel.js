import BaseModel from "./BaseModel";
import userSchema from "../schema/userSchema";
import jwt from "jsonwebtoken";
import { 
    getEnvVariable 
} from "../utils/envVariable";

/**
 * @constants
 */
const privateKey = getEnvVariable("JWT_SECRET_KEY");

/**
 * @class UserModel
 * @classdesc Model class for all user related model functions
 */
export default class UserModel extends BaseModel {

    /**
     * @constructor 
     * @param {*} connection connection
     */
    constructor(connection) {
        super('user', connection);
        this.schema = userSchema;
        this.name = 'user';
        this.model = this.connection.model(this.name, this.schema);
    }

    /**
     * @memberof UserModel
     * @method createUser function to create a user document
     * @param {*} userInfo holds the user information
     * @async 
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
     * @memberof UserModel
     * @param {*} user 
     */
    async generateAuthToken(user) {
        try{
            const token = await jwt.sign(
                { _id: user._id }, 
                privateKey,
                { expiresIn: getEnvVariable("JWT_TOKEN_EXPIRES") }
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
     * 
     * @memberof UserModel
     * @method findUserByCredentials function to find the user as per the credials
     * @param {*} userInfo holds the user information
     * @async
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