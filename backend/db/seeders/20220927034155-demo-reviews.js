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
    options.tableName = 'Reviews'
    await queryInterface.bulkInsert(options, [
      {
        spotId: 5,
        userId: 1,
        review: 'Awesome spot!',
        stars: 5
      },
      {
        spotId: 4,
        userId: 2,
        review: 'Amazing spot!',
        stars: 4
      },
      {
        spotId: 3,
        userId: 4,
        review: 'Beautiful spot',
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Absolutely horrible',
        stars: 1
      },
      {
        spotId: 1,
        userId: 5,
        review: 'Could have been a lot better',
        stars: 2
      },
      {
        spotId: 10,
        userId: 1,
        review: 'Awesome spot!',
        stars: 5
      },
      {
        spotId: 9,
        userId: 2,
        review: 'Amazing spot!',
        stars: 4
      },
      {
        spotId: 8,
        userId: 4,
        review: 'Beautiful spot',
        stars: 5
      },
      {
        spotId: 7,
        userId: 3,
        review: 'Absolutely horrible',
        stars: 1
      },
      {
        spotId: 6,
        userId: 5,
        review: 'Could have been a lot better',
        stars: 2
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
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options, {
      id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      // id: [1, 2, 3, 4, 5]
    })
  }
};
