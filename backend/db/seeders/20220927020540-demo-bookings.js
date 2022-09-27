'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Bookings'[
      {
        spotId: 5,
        userId: 1,
        startDate: '2022-01-17',
        endDate: '2022-01-28'
      },
      {
        spotId: 4,
        userId: 2,
        startDate: '2022-02-17',
        endDate: '2022-02-28'
      },
      {
        spotId: 3,
        userId: 4,
        startDate: '2022-03-17',
        endDate: '2022-03-28'
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2022-04-17',
        endDate: '2022-04-28'
      },
      {
        spotId: 1,
        userId: 5,
        startDate: '2022-05-17',
        endDate: '2022-05-28'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', {
      id: [1, 2, 3, 4, 5]
    })
  }
};
