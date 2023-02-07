'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

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
    options.tableName = 'Bookings'
    await queryInterface.bulkInsert(options, [
      {
        spotId: 5,
        userId: 1,
        startDate: new Date('2023-02-17'),
        endDate: new Date('2023-02-28')
      },
      {
        spotId: 5,
        userId: 1,
        startDate: new Date('2023-01-17'),
        endDate: new Date('2023-01-28')
      },
      {
        spotId: 4,
        userId: 2,
        startDate: new Date('2023-02-17'),
        endDate: new Date('2023-02-28')
      },
      {
        spotId: 3,
        userId: 4,
        startDate: new Date('2023-03-17'),
        endDate: new Date('2023-03-28')
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date('2023-04-17'),
        endDate: new Date('2023-04-28')
      },
      {
        spotId: 1,
        userId: 5,
        startDate: new Date('2023-05-17'),
        endDate: new Date('2023-05-28')
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
    options.tableName = 'Bookings'
    await queryInterface.bulkDelete(options, {
      id: [1, 2, 3, 4, 5, 6]
    })
  }
};
