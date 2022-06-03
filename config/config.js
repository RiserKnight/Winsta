const fs = require('fs');
require('dotenv').config();
module.exports ={
  "development": {
    "username": "postgres",
    "password": process.env.DB_PASS,
    "database": "Winsta",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": process.env.DB_PASS,
    "database": "Winsta",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": process.env.DB_PASS,
    "database": "Winsta",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
