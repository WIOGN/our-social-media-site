import { Schema, model } from 'mongoose';

var NormalImageSchema = new Schema({
    username: {
        type: String,
        default: "Username Suppose to be Here",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }

});

var NormalImage = model('NormalImage', NormalImageSchema);
export default NormalImage;