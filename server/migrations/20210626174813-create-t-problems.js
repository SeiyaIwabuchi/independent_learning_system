'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('t_problems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hash: {
        type: Sequelize.STRING
      },
      subject_id: {
        type: Sequelize.INTEGER,
        references : {
          model : "t_subjects",
          key : "id"
        }
      },
      problem_type: {
        type: Sequelize.INTEGER,
      },
      answer_type: {
        type: Sequelize.INTEGER
      },
      problem_body: {
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
    // チェック制約の追加
    await queryInterface.addConstraint("t_problems",{
      fields : ["problem_type"],
      type : "check",
      where : {
        problem_type : [0,1]
      }
    });
    await queryInterface.addConstraint("t_problems",{
      fields : ["answer_type"],
      type : "check",
      where : {
        answer_type : [0,1]
      }
    });
    await queryInterface.addConstraint('t_problems', {
      fields : ["subject_id"],
      type: 'foreign key',
      name: 'fk_constraint_subjects',
      references: {
        table: 't_subjects',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    // ダミーデータの追加
    await queryInterface.bulkInsert('t_problems',[
      {
        id : 1, //
        hash : "bb6d6053bb5561a075f0baf4547634dbb46457c8a5aa75ac2992518111858738",
        subject_id : 1, //テスト理論
        problem_type : 0,
        answer_type : 0,
        problem_body : "命令網羅(C0カバレッジ)の説明はどれか",
        created_at : new Date(),
        updated_at : new Date(),
      },
      {
        id : 2,
        hash : "7676cf1a72e7456eff8f6a194bb6be27f5e5cf536fcd1ec927b8829200f72719",
        subject_id : 2, //人工知能
        problem_type : 0,
        answer_type : 0,
        problem_body : "機械学習の主な役割はどれか。すべて選べ",
        created_at : new Date(),
        updated_at : new Date(),
      },
      {
        id : 3,
        hash : "1678be44b959e844bcfbd094c7f17eac26c6dd3be1f30dd1fe7bf0f319d26cd3",
        subject_id : 3, //Python
        problem_type : 0,
        answer_type : 0,
        problem_body : "Pythonの特徴をすべて選べ",
        created_at : new Date(),
        updated_at : new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('t_problems');
  }
};