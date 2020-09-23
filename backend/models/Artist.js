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
      this.hasMany(models.Song);
      this.hasMany(models.Album);
    }
  };
  Artist.init({
    artistName: {
      type: DataTypes.STRING,
      field: "artist_name"
    },
    coverImg: {
      type: DataTypes.STRING,
      field:"cover_img"
    },
    uploadedAt: {
      type: DataTypes.DATEONLY,
      field: "uploaded_at"
    }
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};