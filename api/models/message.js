import { Schema, model } from 'mongoose';

var messageSchema = new Schema({
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    message: {
        //true for like and false for dislike
        type: String,
        required: true
    }
});

var message = model('message', messageSchema);
export default message;