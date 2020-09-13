require('dotenv').config();
const express = require('express');
let mysql = require('mysql');
const app = express();

app.use(express.json());
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

/* ----- */

/* -- GET REQUESTS -- */ 

/* Get all songs */
app.get('/songs', (req, res) => {
    const { title } = req.query;
    title
    ?   mysqlCon.query(`SELECT * FROM songs WHERE title LIKE '${title}'`, (err, results) => {
        err ? res.send(err) : res.send(results)
    })
    :   mysqlCon.query('SELECT * FROM songs;', (error, results) => {
            if (error) {
                res.send(error.message);
                throw error;
            };
            res.send(results);
        });
});

/* Get a song by id, title works too */
app.get('/songs/:idORtitle', (req, res) => {
    mysqlCon.query('SELECT * FROM songs WHERE id = ? OR title LIKE ?', [req.params.idORtitle, req.params.idORtitle], (error, results) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

/* Get an album by id or name */
app.get('/albums/:idORname', (req, res) => {
    mysqlCon.query('SELECT * FROM albums WHERE id = ? OR name LIKE ?', [req.params.idORname, req.params.idORname], (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)      
      });
});

/* Get an artist by id or name */
app.get('/artists/:idORname', (req, res) => {
    mysqlCon.query('SELECT * FROM artists WHERE id = ? OR name LIKE ?', [req.params.idORname, req.params.idORname], (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)      
      });
});

/* Get a playlist by id or name */
app.get('/playlists/:idORname', (req, res) => {
    mysqlCon.query('SELECT * FROM playlists WHERE id = ? OR name LIKE ?', [req.params.idORname, req.params.idORname], (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)      
      });
});

/* Get top 20 songs */
app.get('/top/songs', (req, res) => {
    mysqlCon.query('SELECT * FROM songs LIMIT 20;', (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)   
    });
});

/* Get top 20 albums */
app.get('/top/albums', (req, res) => {
    mysqlCon.query('SELECT * FROM albums LIMIT 20;', (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)   
    });
});

/* Get top 20 artists */
app.get('/top/artists', (req, res) => {
    mysqlCon.query('SELECT * FROM artists LIMIT 20;', (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)   
    });
});

/* Get top 20 playlists */
app.get('/top/playlists', (req, res) => {
    mysqlCon.query('SELECT * FROM playlists LIMIT 20;', (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)   
    });
});

/* -- POST REQUESTS -- */

/* Add a song to the database */
app.post('/songs', (req, res) => {
    mysqlCon.query('INSERT INTO songs SET ?', req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
});

/* Add an album to the database */
app.post('/albums', (req, res) => {
    mysqlCon.query('INSERT INTO albums SET ?', req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
});

/* Add an artist to the database */
app.post('/artist', (req, res) => {
    mysqlCon.query('INSERT INTO artists SET ?', req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
});

/* Add a playlist to the database */
app.post('/playlists', (req, res) => {
    mysqlCon.query('INSERT INTO playlists SET ?', req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
});

/* -- PUT REQUESTS -- */

/* Edit a song by its unique identifier */
app.put('/songs/:id', (req, res) =>{
    mysqlCon.query(`UPDATE songs SET ? WHERE id = ${req.params.id}`, req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
});

/* Edit an album by its unique identifier */
app.put('/albums/:id', (req, res) =>{
    mysqlCon.query(`UPDATE albums SET ? WHERE id = ${req.params.id}`, req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
});

/* Edit an artist by its unique identifier */
app.put('/artists/:id', (req, res) =>{
    mysqlCon.query(`UPDATE artists SET ? WHERE id = ${req.params.id}`, req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
});

/* Edit a playlist by its unique identifier */
app.put('/playlists/:id', (req, res) =>{
    mysqlCon.query(`UPDATE playlists SET ? WHERE id = ${req.params.id}`, req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
});

/* -- DELETE REQUESTS -- */

/* Delete a song using its unique identifier */
app.delete('/songs/:id', async (req, res) =>{
    mysqlCon.query(`DELETE FROM songs WHERE id = ${req.params.id}`, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
      });
});

/* Delete an album using its unique identifier */
app.delete('/albums/:id', async (req, res) =>{
    mysqlCon.query(`DELETE FROM albums WHERE id = ${req.params.id}`, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
      });
});

/* Delete an artist using its unique identifier */
app.delete('/artists/:id', async (req, res) =>{
    mysqlCon.query(`DELETE FROM artists WHERE id = ${req.params.id}`, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
      });
});

/* Delete a playlist using its unique identifier */
app.delete('/playlists/:id', async (req, res) =>{
    mysqlCon.query(`DELETE FROM playlists WHERE id = ${req.params.id}`, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
      });
});

/* ----- */

app.listen(3001);