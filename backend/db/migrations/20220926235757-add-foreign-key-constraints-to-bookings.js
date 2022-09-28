'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Bookings', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'userId-foreign-key',
      references: {
        table: 'Users',
        field: 'id'
      },
      // onDelete: 'CASCADE'
    })
    await queryInterface.addConstraint('Bookings', {
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
    await queryInterface.removeConstraint('Bookings', 'userId-foreign-key')
    await queryInterface.removeConstraint('Bookings', 'spotId-foreign-key')

  }
};
