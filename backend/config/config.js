require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_TRY,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "define": {
      'underscored': true
    }
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_TRY,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "define": {
      'underscored': true
    }
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_TRY,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "define": {
      'underscored': true
    }
  }
}
