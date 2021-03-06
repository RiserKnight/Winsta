'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('UserAuths', {
      userID: {
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        unique:true,
        validate:{
          notNull:{msg:'User  must have a id'},
          notEmpty:{msg:'id must not be empty'}
        }
  
      },
      pass: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'User  must have a pass'},
          notEmpty:{msg:'Pass must not be empty'}
        }
  
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('UserAuths');
  }
};