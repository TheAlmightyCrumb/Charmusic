require('dotenv').config();
const express = require('express');
const artists = require('./sequelizeRoutes/artists');

const app = express();
app.use(express.json());
app.use('/artists', artists)

app.listen(3001);