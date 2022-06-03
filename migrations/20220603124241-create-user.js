'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Users', {
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
      name: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'User  must have a Name'},
          notEmpty:{msg:'Name must not be empty'}
        }
  
      },
      email: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'User  must have a Email'},
          notEmpty:{msg:'Email must not be empty'}
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
    await queryInterface.dropTable('Users');
  }
};