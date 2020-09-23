const express = require('express');
let router = express.Router();
let mysql = require('mysql');

let mysqlCon = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
  });

router.route('/')

/* Get all albums */
.get((req, res) => {
    mysqlCon.query('SELECT * FROM albums;', (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)      
      });
})

/* Add an album to the database */
.post((req, res) => {
    mysqlCon.query('INSERT INTO albums SET ?', req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
});

router.route('/:id')

/* Get an album by id */
.get((req, res) => {
    mysqlCon.query('SELECT * FROM albums WHERE Album_id = ?', req.params.id, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)      
      });
})

/* Edit an album by its unique identifier */
.put((req, res) =>{
    mysqlCon.query(`UPDATE albums SET ? WHERE Album_id = ${req.params.id}`, req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
})

/* Delete an album using its unique identifier */
.delete((req, res) =>{
    mysqlCon.query(`DELETE FROM albums WHERE Album_id = ${req.params.id}`, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
      });
});

module.exports = router;