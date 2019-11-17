import mongoose from 'mongoose';
import {
    getEnvVariable
} from "../utils/envVariable";
// import doten
const mongoDBUri = getEnvVariable('MONGO_DB_URI');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
const mongoConnection = mongoose.connect(mongoDBUri, options);

//make the base model 
export default class BaseModel {
    constructor(name, connection) {
        this.name = name;
        if (mongoConnection) {
            this.connection = mongoose.connection;
        }
    }
    async _getModel() {
        this.model = await this.connection.model(this.name, this.schema);
    }

}