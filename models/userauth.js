'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAuth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserAuth.init({
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

    }
  }, {
    sequelize,
    modelName: 'UserAuth',
  });
  return UserAuth;
};