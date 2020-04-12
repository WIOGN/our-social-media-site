import express from 'express';
import mongoose from 'mongoose';

import imagePostRoutes from './routes/api/imagePost'

var app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/wiogn', { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', function () {
    console.log("MongoDB Error...");
});

db.once('open', function () {
    console.log("MongoDB Connection Sucessful!!!");
});

//Use Routes
app.use('/api/imageposts', imagePostRoutes);

app.listen(8000, () => console.log('Listening on port 8000..'));