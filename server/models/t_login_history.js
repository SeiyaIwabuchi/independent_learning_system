'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_login_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  t_login_history.init({
    user_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 't_login_history',
    underscored: true,
  });
  return t_login_history;
};