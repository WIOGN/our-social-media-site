import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import socketio from 'socket.io';

import upload from './api/routes/upload';
import getSmall from './api/routes/getSmall';
import getImage from './api/routes/getNormal';
// import addComment from './api/routes/socketComment';

var app = express();
app.use(cors())

var connection = mongoose.connect('mongodb+srv://admin:password12345@wiogn-rcqw7.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true });
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

var server = app.listen(8000, () => console.log('Listening on port 8000..'));



//socket part
var io = socketio(server);
// app.set('io', io);



import CommentModel from './api/models/commentModel';

io.on('connection', async (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.emit('newComment', { comment: "hello new user" });
});

