import mongoose from "mongoose";

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
    isActive: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});


export default userSchema;