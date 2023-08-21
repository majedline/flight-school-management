"use strict";
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";

let configPart = ""
if (process.env.NODE_ENV === "production") {
  configPart = {
    "username": process.env.username,
    "password": process.env.password,
    "database": process.env.database,
    "host": process.env.host,
    "port": process.env.port,
    "dialect": process.env.dialect,
    "use_env_variable": process.env.use_env_variable,
    "pool": {
      "max": 5,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    }
  }
  console.log("configPart", configPart);
} else {
  configPart = require(path.join(__dirname, "../../config/config.json"))[env]
}

var config = configPart;
var db = {};

if (config.use_env_variable) {
  // var sequelize = new Sequelize(process.env[config.use_env_variable]);
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach(function (file) {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
