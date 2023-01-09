'use strict';

let options = {}
options.tableName = 'ReviewImages'

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint(options, {
      fields: ['reviewId'],
      type: 'foreign key',
      name: 'reviewId-foreign-key',
      references: {
        table: 'Reviews',
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
    await queryInterface.removeConstraint(options, 'reviewId-foreign-key')
  }
};
