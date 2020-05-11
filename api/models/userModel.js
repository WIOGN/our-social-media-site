import { Schema, model } from 'mongoose';

var userSchema = new Schema({
    username: {
        type: String,
        default: "Username Suppose to be Here",
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

var userModel = model('userModel', userSchema);
export default userModel;