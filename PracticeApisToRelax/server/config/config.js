
require('dotenv').config({ path: "../.env" });
module.exports ={
  "development": {
    username: "disadmin",
    password: 'BA£[5p0ir48@',
    database: 'cruditdb',
    host: 'localhost',
    dialect: mysql
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}




