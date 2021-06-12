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
    id: DataTypes.INTEGER,
    user_id: DataTypes.STRING,
    session_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 't_sessions',
    underscored: true,
  });
  return t_sessions;
};