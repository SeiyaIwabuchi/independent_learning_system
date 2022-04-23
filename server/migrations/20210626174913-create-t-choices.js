'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('t_choices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      problem_id: {
        type: Sequelize.INTEGER,
        references : {
          model : "t_problems",
          key : "id"
        }
      },
      choice_text: {
        type: Sequelize.STRING
      },
      collect_flag: {
        type: Sequelize.BOOLEAN
      },
      image_id: {
        type: Sequelize.INTEGER,
        references : {
          model : "t_images",
          key : "id"
        }
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
    await queryInterface.addConstraint('t_choices', {
      fields : ["problem_id"],
      type: 'foreign key',
      references: {
        table: 't_problems',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    // ダミーデータの追加
    await queryInterface.bulkInsert('t_choices',[
      {
        id : null,
        problem_id : 1,
        choice_text : "それぞれの命令文が少なくとも1回は実行されるテスト",
        collect_flag : true,
        image_id : null,
        created_at : new Date(),
        updated_at : new Date(),
      },
      {
        id : null,
        problem_id : 1,
        choice_text : "それぞれの判定条件における真偽が少なくとも1回は実行されるテスト",
        collect_flag : false,
        image_id : null,
        created_at : new Date(),
        updated_at : new Date(),
      },
      {
        id : null,
        problem_id : 2,
        choice_text : "予測",
        collect_flag : true,
        image_id : null,
        created_at : new Date(),
        updated_at : new Date(),
      },
      {
        id : null,
        problem_id : 2,
        choice_text : "分類",
        collect_flag : true,
        image_id : null,
        created_at : new Date(),
        updated_at : new Date(),
      },
      {
        id : null,
        problem_id : 2,
        choice_text : "識別",
        collect_flag : true,
        image_id : null,
        created_at : new Date(),
        updated_at : new Date(),
      },
      {
        id : null,
        problem_id : 2,
        choice_text : "計算",
        collect_flag : false,
        image_id : null,
        created_at : new Date(),
        updated_at : new Date(),
      },
      {
        id : null,
        problem_id : 3,
        choice_text : "javaと比べて可読性が高い",
        collect_flag : true,
        image_id : null,
        created_at : new Date(),
        updated_at : new Date(),
      },
      {
        id : null,
        problem_id : 3,
        choice_text : "完全な静的型付け言語である",
        collect_flag : false,
        image_id : null,
        created_at : new Date(),
        updated_at : new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('t_choices');
  }
};