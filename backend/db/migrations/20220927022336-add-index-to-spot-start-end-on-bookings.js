'use strict';

let options = {}
options.tableName = 'Bookings'

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
    await queryInterface.addIndex(options,
      ['spotId', 'startDate', 'endDate'],
      {
        unique: true
      }
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeIndex(options, ['spotId', 'startDate', 'endDate'])
  }
};
