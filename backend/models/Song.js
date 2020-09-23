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
        foreignKey: 'artistId'
      });
      this.belongsTo(models.Album, {
        foreignKey: 'albumId'
      });
    }
  };
  Song.init({
    title: DataTypes.STRING,
    artistId: {
      type: DataTypes.INTEGER,
      field: "artist_id"
    }, 
    albumId: {
      type: DataTypes.INTEGER,
      field: "album_id"
    },
    length: DataTypes.INTEGER,
    trackNumber: {
      type: DataTypes.INTEGER,
      field: "track_number"
    },
    lyrics: DataTypes.TEXT,
    youtube: DataTypes.STRING,
    releasedAt: {
      type: DataTypes.DATEONLY,
      field: "realeased_at"
    },
    uploadedAt: {
      type: DataTypes.DATEONLY,
      field: "uploaded_at"
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at"
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at"
    }
  },
  {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};