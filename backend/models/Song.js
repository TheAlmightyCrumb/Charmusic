'use strict';
const {
  Model, DATEONLY
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId',
        onDelete: 'cascade'
      });
      this.belongsTo(models.Album, {
        foreignKey: 'albumId',
        onDelete:'cascade'
      });
      this.hasMany(models.Library, {
        foreignKey: 'songId'
      })
    }
  };
  Song.init({
    title: DataTypes.STRING,
    artistId: DataTypes.INTEGER, 
    albumId: DataTypes.INTEGER,
    length: DataTypes.INTEGER,
    trackNumber: DataTypes.INTEGER,
    lyrics: DataTypes.TEXT,
    youtube: DataTypes.STRING,
    releasedAt: DataTypes.DATEONLY,
    uploadedAt: DataTypes.DATEONLY
  },
  {
    sequelize,
    modelName: 'Song',
    paranoid: true
  });
  return Song;
};