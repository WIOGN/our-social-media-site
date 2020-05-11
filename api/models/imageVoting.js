import { Schema, model } from 'mongoose';

var imageVotingSchema = new Schema({
    username: {
        type: String,
        default: "Username Suppose to be Here",
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    vote: {
        //true for like and false for dislike
        type: Boolean,
        required: true
    }
});

var imageVoting = model('imageVoting', imageVotingSchema);
export default imageVoting;