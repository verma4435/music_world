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
/**
 * @class BaseModel
 * @classdesc Class for the all model to create a connection b/w mongo and node
 */
export default class BaseModel {
    /**
     * @constructor 
     * @param {*} name name of the schema
     * @param {*} connection to generate a connection
     */
    constructor(name, connection) {
        this.name = name;
        if (mongoConnection) {
            this.connection = mongoose.connection;
        }
    }

    /**
     * @memberof BaseModel
     * @method _getModel function to get the model
     * @async 
     */
    async _getModel() {
        this.model = await this.connection.model(this.name, this.schema);
    }

}