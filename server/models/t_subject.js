'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  t_subject.init({
    id: DataTypes.INTEGER,
    hash: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 't_subject',
    underscored: true,
  });
  return t_subject;
};