import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import socketio from 'socket.io';
import fs from 'fs';

import upload from './api/routes/upload';
import getSmall from './api/routes/getSmall';
import getImage from './api/routes/getNormal';
import socketComment from './api/routes/socketComment';
import socketHome from './api/routes/socketHome';
import userController from './api/routes/userController';
import imageData from './api/routes/imageDataSystem';
import privateAction from './api/routes/private';

fs.mkdir('./uploads/originals', { recursive: true }, (err) => {
    if (err) {
        console.log(err);
    }
});

fs.mkdir('./uploads/smalls', { recursive: true }, (err) => {
    if (err) {
        console.log(err);
    }
});

var app = express();
app.use(cors());
app.use(express.json());

var connection = mongoose.connect('mongodb://mongo:27017', { useUnifiedTopology: true });
// var connection = mongoose.connect('mongodb+srv://admin:password12345@wiogn-rcqw7.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true });

var db = mongoose.connection;

db.on('error', function () {
    console.log("MongoDB Error...");
});

db.once('open', function () {
    console.log("MongoDB Connection Sucessful!!!");
});

// Use Routes
app.use('/api/upload', upload);
app.use('/api/getsmall', getSmall);
app.use('/api/getimage', getImage);
app.use('/api/usercontroller', userController);
app.use('/api/imagedata', imageData);
app.use('/api/private', privateAction);

//Production mode here
app.use(express.static('frontend/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});


var server = app.listen(8000, () => console.log('Listening on port 8000..'));
var io = socketio(server);
socketComment(io);
socketHome(io);