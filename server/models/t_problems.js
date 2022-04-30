'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_problems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.t_subjects,{foreignKey : "subject_id"})
      this.hasMany(models.t_choices,{foreignKey : "problem_id"})
    }
  };
  t_problems.init({
    hash: DataTypes.STRING,
    subject_id: DataTypes.INTEGER,
    problem_type: DataTypes.INTEGER,
    answer_type: DataTypes.INTEGER,
    problem_body: DataTypes.STRING(511)
  }, {
    sequelize,
    modelName: 't_problems',
    underscored: true,
  });
  return t_problems;
};