'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Posts', {
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
      name: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'User  must have a Name'},
          notEmpty:{msg:'Name must not be empty'}
        }
  
      },
      fileName: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'Post  must have a fileName'},
          notEmpty:{msg:'fileName must not be empty'}
        }
  
      },
      caption: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'Post must have a Caption'},
          notEmpty:{msg:'Caption must not be empty'}
        }
  
      },
      upVotes:{
        type:DataTypes.INTEGER,
        defaultValue:1
      },
      downVotes:{
        type:DataTypes.INTEGER,
        defaultValue:1
      },
      comments:{
        type:DataTypes.INTEGER,
        defaultValue:1
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
    await queryInterface.dropTable('Posts');
  }
};