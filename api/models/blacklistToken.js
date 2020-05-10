import { Schema, model } from 'mongoose';

var blackListTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    expiredAt: {
        type: Date,
        expires: '1d',
        default: Date.now
    }
});

var userModel = model('userModel', userSchema);
export default userModel;