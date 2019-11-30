import { Mongoose } from 'mongoose';

const musicSchema = new Mongoose.Schema({

    name: {
        type: String,
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