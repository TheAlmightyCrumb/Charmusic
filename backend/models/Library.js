'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Library extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      this.belongsTo(models.Song, {
        foreignKey: 'songId'
      });
      this.belongsTo(models.Playlist, {
        foreignKey: 'playlistId'
      });
    }
  };
  Library.init({
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Library',
  });
  return Library;
};