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

/* Get all artists */
.get((req, res) => {
    mysqlCon.query('SELECT * FROM artists;', (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)      
      });
})

/* Add an artist to the database */
.post((req, res) => {
    mysqlCon.query('INSERT INTO artists SET ?', req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
});

router.route('/:id')

/* Get an artist by id */
.get((req, res) => {
    mysqlCon.query(
        `SELECT * FROM artists WHERE Artist_id = ?`, req.params.id, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)      
      });
})

/* Edit an artist by its unique identifier */
.put((req, res) =>{
    mysqlCon.query(`UPDATE artists SET ? WHERE Artist_id = ${req.params.id}`, req.body, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
    });
})

/* Delete an artist using its unique identifier */
.delete((req, res) =>{
    mysqlCon.query(`DELETE FROM artists WHERE Artist_id = ${req.params.id}`, (error, results) => {
        error
        ? res.send(error.message)
        : res.send(results)
      });
});

module.exports = router;