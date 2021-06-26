'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  t_images.init({
    image_path: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 't_images',
    underscored: true,
  });
  return t_images;
};