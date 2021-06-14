'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_sessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  t_sessions.init({
    user_id: DataTypes.NUMBER,
    login_history_id : DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 't_sessions',
    underscored: true,
  });
  return t_sessions;
};