'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Song, {
        foreignKey: 'artistId',
        as: 'songs'
      });
      this.hasMany(models.Album, {
        foreignKey: 'artistId',
        as: 'albums'
      });
    }
  };
  Artist.init({
    artistName: DataTypes.STRING,
    coverImg: DataTypes.STRING,
    uploadedAt: DataTypes.DATEONLY
  },
  {
    sequelize,
    modelName: 'Artist',
    paranoid: true
  });
  return Artist;
};