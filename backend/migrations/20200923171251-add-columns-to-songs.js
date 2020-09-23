'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Songs', 'artist_id', Sequelize.INTEGER, {
      after: 'title'
    });
    await queryInterface.addColumn('Songs', 'album_id', Sequelize.INTEGER, {
      after: 'artist_id'
    });
    await queryInterface.addColumn('Songs', 'youtube', Sequelize.STRING, {
      after: 'lyrics'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
