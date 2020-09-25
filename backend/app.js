require('dotenv').config();
const express = require('express');
const artists = require('./sequelizeRoutes/artists');
const albums = require('./sequelizeRoutes/albums');
const songs = require('./sequelizeRoutes/songs');

const app = express();

app.use(express.json());
app.use('/artists', artists);
app.use('/albums', albums);
app.use('/songs', songs);

app.listen(3001);