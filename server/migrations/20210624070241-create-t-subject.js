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
      hash : {
        type: Sequelize.STRING,
        allowNull: false,
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
      hash : "f7142016307115357f86124746e1857d2da95e4f979f19bcfbe4d2fc1d3a7c7b",
      name : "テスト理論",
      description : "Junitを用いたJavaのテスト",
      created_at : new Date(),
      updated_at : new Date(),
    },{
      id : null,
      hash : "0a1d038de09f9a45f271feaeb7c2e3b015aa0242e3402c894eca5124aa837329",
      name : "人工知能",
      description : "ExcelとPythonを用いた機械学習超入門",
      created_at : new Date(),
      updated_at : new Date(),
    },{
      id : null,
      hash : "187bf2359ec4c8f341bd784c20708d2edd5b24eb5e3445f24c6befdc8eff9c3a",
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