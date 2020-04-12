import { Schema, model } from 'mongoose';

var ImagePostSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: Buffer,
        required: true
    }
})

var ImagePost = model('imagePost', ImagePostSchema);
export default ImagePost;