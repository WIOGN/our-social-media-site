import { Schema, model } from 'mongoose';

var NormalImageSchema = new Schema({
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