'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
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

    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};