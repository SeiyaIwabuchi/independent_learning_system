'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  t_users.init({
    id: DataTypes.INTEGER,
    login_id: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 't_users',
    underscored: true,
  });
  return t_users;
};