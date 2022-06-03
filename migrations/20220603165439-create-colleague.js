'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Colleagues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userID: {
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
          notNull:{msg:'User  must have a id'},
          notEmpty:{msg:'id must not be empty'}
        }
  
      },
      colleagueID: {
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
          notNull:{msg:'Colleague  must have a id'},
          notEmpty:{msg:'id must not be empty'}
        }
  
      },
      colleagueName: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'Colleague  must have a Name'},
          notEmpty:{msg:'Name must not be empty'}
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
    await queryInterface.dropTable('Colleagues');
  }
};