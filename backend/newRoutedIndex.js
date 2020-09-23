require('dotenv').config();
const express = require('express');
let mysql = require('mysql');
const app = express();
const songs = require('./routes/songs');
const albums = require('./routes/albums');
const artists = require('./routes/artists');
const playlists = require('./routes/playlists');
const top = require('./routes/top');

app.use(express.json());
app.use('/songs', songs);
app.use('/albums', albums);
app.use('/artists', artists);
app.use('/playlists', playlists);
app.use('/top', top);
app.use(logger);

function logger (req, res, next) {
    console.log('request fired ' + req.url + ' ' + req.method);
    next();
}

let mysqlCon = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
  });

  mysqlCon.connect(err => {
    if (err) throw err;
    console.log("Connected!");
});

app.listen(3001);