'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_choices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  t_choices.init({
    problem_id: DataTypes.INTEGER,
    choice_text: DataTypes.STRING,
    collect_flag: DataTypes.BOOLEAN,
    image_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 't_choices',
    underscored: true,
  });
  return t_choices;
};