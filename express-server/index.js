const express = require('express');
const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/combinedHTML/index.html');
});

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/combinedHTML/index.html');
});

app.get('/index.css', (req, res) => {
    res.sendFile(__dirname + '/combinedHTML/index.css');
});

app.get('/orange.jpg', (req, res) => {
    res.sendFile(__dirname + '/combinedHTML/orange.jpg');
});

app.get('/authors.html', (req, res) => {
    res.sendFile(__dirname + '/combinedHTML/authors.html');
});

app.get('/grid.css', (req, res) => {
    res.sendFile(__dirname + '/combinedHTML/grid.css');
});

app.get('/image.css', (req, res) => {
    res.sendFile(__dirname + '/combinedHTML/image.css');
});

app.get('/image.html', (req, res) => {
    res.sendFile(__dirname + '/combinedHTML/image.html');
});

app.get('/login.css', (req, res) => {
    res.sendFile(__dirname + '/combinedHTML/login.css');
});

app.get('/navbar.css', (req, res) => {
    res.sendFile(__dirname + '/combinedHTML/navbar.css');
});

app.get('/signup.css', (req, res) => {
    res.sendFile(__dirname + '/combinedHTML/signup.css');
});

app.get('/tags.html', (req, res) => {
    res.sendFile(__dirname + '/combinedHTML/tags.html');
});

app.get('/userAccount.css', (req, res) => {
    res.sendFile(__dirname + '/combinedHTML/userAccount.css');
});

app.get('/userAccount.html', (req, res) => {
    res.sendFile(__dirname + '/combinedHTML/userAccount.html');
});

app.get('/userAccount.js', (req, res) => {
    res.sendFile(__dirname + '/combinedHTML/userAccount.js');
});

app.listen(8001, () => console.log('Listening on port 8001..'));
