'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Library, {
        foreignKey: 'playlistId',
        as: 'songs'
      })
    }
  };
  Playlist.init({
    playlistName: DataTypes.STRING,
    coverImg: DataTypes.STRING,
    uploadedAt: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};