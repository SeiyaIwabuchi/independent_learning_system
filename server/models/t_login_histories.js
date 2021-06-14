'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_login_histories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  t_login_histories.init({
    user_name: DataTypes.STRING,
    trial_date : DataTypes.DATE
  }, {
    sequelize,
    modelName: 't_login_histories',
    underscored: true,
  });
  return t_login_histories;
};