'use strict';

// let options = {}
// options.tableName = 'SpotImages'

// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA
// }

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('SpotImages', {
      fields: ['spotId'],
      type: 'foreign key',
      name: 'spotId-foreign-key',
      references: {
        table: 'Spots',
        field: 'id'
      },
      onDelete: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('SpotImages', 'spotId-foreign-key')
  }
};
