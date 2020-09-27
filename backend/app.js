require('dotenv').config();
const express = require('express');
const artists = require('./sequelizeRoutes/artists');
const albums = require('./sequelizeRoutes/albums');
const songs = require('./sequelizeRoutes/songs');
const playlists = require('./sequelizeRoutes/playlists');
const top = require('./sequelizeRoutes/top');

const app = express();

app.use(express.json());
app.use('/artists', artists);
app.use('/albums', albums);
app.use('/songs', songs);
app.use('/playlists', playlists);
app.use('/top', top);

module.exports = app;