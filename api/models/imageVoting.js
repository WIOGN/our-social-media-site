import { Schema, model } from 'mongoose';

var imageVotingSchema = new Schema({
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