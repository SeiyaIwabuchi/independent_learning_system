'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_subjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.t_problems, {foreignKey : "id"})
    }
  };
  t_subjects.init({
    hash : DataTypes.STRING,
    name : DataTypes.STRING,
    description : DataTypes.STRING
  }, {
    sequelize,
    modelName: 't_subjects',
    underscored: true,
  });
  return t_subjects;
};