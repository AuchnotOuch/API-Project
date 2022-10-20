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
    await queryInterface.bulkInsert('Reviews', [
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
    await queryInterface.bulkDelete('Reviews', {
      id: [1, 2, 3, 4, 5]
    })
  }
};
