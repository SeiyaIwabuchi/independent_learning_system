'use strict';
const sequelize = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('t_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    queryInterface.bulkInsert('t_users',[{
      id : null,
      name : "t",
      password : "t",
      created_at : new Date(),
      updated_at : new Date(),
    }]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('t_users');
  }
};