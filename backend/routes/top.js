const express = require('express');
let mysql = require('mysql');
let router = express.Router();

let mysqlCon = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
  });

  router
    /* Get top 20 songs */
    .get("/songs", (req, res) => {
      mysqlCon.query("SELECT * FROM songs LIMIT 20;", (error, results) => {
        error ? res.send(error.message) : res.send(results);
      });
    })

    /* Get top 20 albums */
    .get("/albums", (req, res) => {
      mysqlCon.query("SELECT * FROM albums LIMIT 20;", (error, results) => {
        error ? res.send(error.message) : res.send(results);
      });
    })

    /* Get top 20 artists */
    .get('/artists', (req, res) => {
        mysqlCon.query('SELECT * FROM artists LIMIT 20;', (error, results) => {
            error
            ? res.send(error.message)
            : res.send(results)   
        });
    })

    /* Get top 20 playlists */
    .get('/playlists', (req, res) => {
        mysqlCon.query('SELECT * FROM playlists LIMIT 20;', (error, results) => {
            error
            ? res.send(error.message)
            : res.send(results)   
        });
    });

module.exports = router;