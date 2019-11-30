import { Mongoose } from 'mongoose';

const musicSchema = new Mongoose.Schema({

    name: {
        type: String,
        default: null
    },
    playlist: {
        type: String,   // to be of ref type
        default: null
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }

});



export default musicSchema;