'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
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
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};