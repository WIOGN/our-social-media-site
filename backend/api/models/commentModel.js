import { Schema, model } from 'mongoose';

var CommentModelSchema = new Schema({
    username: {
        type: String,
        default: "Username",
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

var CommentModel = model('CommentModel', CommentModelSchema);
export default CommentModel;