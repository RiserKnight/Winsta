'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Colleague extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Colleague.init({
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

    }
  }, {
    sequelize,
    modelName: 'Colleague',
  });
  return Colleague;
};