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
app.use(cors())

var connection = mongoose.connect('mongodb://mongo:27017', { useUnifiedTopology: true });
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

//Production mode here
app.use(express.static('frontend/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});


var server = app.listen(8000, () => console.log('Listening on port 8000..'));
var io = socketio(server);
socketComment(io);
socketHome(io);