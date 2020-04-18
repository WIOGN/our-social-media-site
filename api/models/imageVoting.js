import { Schema, model } from 'mongoose';

var imageVotingSchema = new Schema({
    imageName: {
        type: String,
        required: true
    },
    vote: {
        type: String,
        required: true
    }
});

var imageVoting = model('imageVoting', imageVotingSchema);
export default imageVoting;