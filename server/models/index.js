'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.DEV_ENV || 'home';
const config = require(__dirname + '/../config/config.json')[env];
console.log(`Database env : ${env}`);
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//dbオブジェクトに手動で追加
const db = {
  t_users : require("./t_users")(sequelize, Sequelize.DataTypes),
  t_login_histories : require("./t_login_histories")(sequelize, Sequelize.DataTypes),
  t_sessions : require("./t_sessions")(sequelize, Sequelize.DataTypes),
  t_subjects : require("./t_subjects")(sequelize, Sequelize.DataTypes),
  t_images : require("./t_images")(sequelize, Sequelize.DataTypes),
  t_problems : require("./t_problems")(sequelize, Sequelize.DataTypes),
  t_choices : require("./t_choices")(sequelize, Sequelize.DataTypes),
};

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     console.log(file); // ここの表示がLogin.jsとなる。まず、webpackするときのディレクトリが違う。んだと思う
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
    
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
