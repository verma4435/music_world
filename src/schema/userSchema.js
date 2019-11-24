import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: val => validator.isEmail(val),
            message: props => `${props.value} is not valid email`
        }
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: false,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    tokens:[{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
});


export default userSchema;