import { Schema, model } from 'mongoose';

var SmallImageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// SmallImageSchema.methods.toJSON = function () {
//     var obj = this.toObject();
//     delete obj._id;
//     delete obj.path;
//     delete obj.date;
//     delete obj.__v;
//     return obj;
// }

var SmallImage = model('SmallImage', SmallImageSchema);
export default SmallImage;