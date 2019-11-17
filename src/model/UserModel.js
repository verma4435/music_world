import BaseModel from "./BaseModel";
import userSchema from "../schema/userSchema";

export default class UserModel extends BaseModel {
    constructor(connection) {
        super('user', connection);
        this.schema = userSchema;
        this.name = 'user';
        this.model = this.connection.model(this.name, this.schema);
    }

    async createUser(userInfo) {
        try {
            console.log("userinfo",userInfo);
            const user = await this.model.create(userInfo);
            return user;
        } catch (err) {
            console.log(err);
            return err;;
        }
    }
}