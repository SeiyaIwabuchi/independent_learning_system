'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('t_subjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description : {
        type: Sequelize.STRING,
        allowNull: false,
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
    queryInterface.bulkInsert('t_subjects',[{
      id : null,
      name : "テスト理論",
      description : "Junitを用いたJavaのテスト",
      created_at : new Date(),
      updated_at : new Date(),
    },{
      id : null,
      name : "人工知能",
      description : "ExcelとPythonを用いた機械学習超入門",
      created_at : new Date(),
      updated_at : new Date(),
    },{
      id : null,
      name : "Python",
      description : "Pythonの基礎学習",
      created_at : new Date(),
      updated_at : new Date(),
    },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('t_subjects');
  }
};