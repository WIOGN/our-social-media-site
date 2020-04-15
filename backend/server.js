import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import upload from './api/routes/upload';
import getSmall from './api/routes/getSmall';

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

app.listen(8000, () => console.log('Listening on port 8000..'));