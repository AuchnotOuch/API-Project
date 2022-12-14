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
    options.tableName = 'Spots'
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '1764 Rosebud Avenue',
        city: 'Mount Judea',
        state: 'Arkansas',
        country: 'United States of America',
        lat: 35.967026,
        lng: -92.948250,
        name: 'Rosebud Ranch',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 150
      },
      {
        ownerId: 2,
        address: '107 Pinewood Drive',
        city: 'Deerfield',
        state: 'Illinois',
        country: 'United States of America',
        lat: 42.225288,
        lng: -87.946381,
        name: 'Pinewood Manor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 250
      },
      {
        ownerId: 3,
        address: '2792 Washburn Street',
        city: 'Baton Rouge',
        state: 'Louisiana',
        country: 'United States of America',
        lat: 30.433619,
        lng: -91.133209,
        name: 'Washburn Home',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 350
      },
      {
        ownerId: 4,
        address: '714 Collins Street',
        city: 'Clearwater',
        state: 'Florida',
        country: 'United States of America',
        lat: 28.038658,
        lng: -82.745987,
        name: 'Collins Home',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 215
      },
      {
        ownerId: 5,
        address: '4609 Calico Drive',
        city: 'Washtucna',
        state: 'Washington',
        country: 'United States of America',
        lat: 46.886166,
        lng: -118.294113,
        name: 'Calico Chateau',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 400
      },
      {
        ownerId: 1,
        address: '1758 Hamill Avenue',
        city: 'San Diego',
        state: 'California',
        country: 'United States of America',
        lat: 32.895561,
        lng: -117.284500,
        name: 'Hamill Hill',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 150
      },
      {
        ownerId: 2,
        address: '3447 Bingamon Branch Road',
        city: 'Lake Forest',
        state: 'Illinois',
        country: 'United States of America',
        lat: 42.261929,
        lng: -87.859642,
        name: 'Bingamon Bungaloo',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 250
      },
      {
        ownerId: 3,
        address: '4001 Cambridge Place',
        city: 'Baltimore',
        state: 'Maryland',
        country: 'United States of America',
        lat: 39.323212,
        lng: -76.700180,
        name: 'Cambridge Cottage',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 350
      },
      {
        ownerId: 4,
        address: '3192 Pennsylvania Avenue',
        city: 'New Brunswick',
        state: 'New Jersey',
        country: 'United States of America',
        lat: 40.443775,
        lng: -74.410324,
        name: 'New England Hidden Treasure',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 215
      },
      {
        ownerId: 5,
        address: '1684 Chenoweth Drive',
        city: 'Nashville',
        state: 'Tennessee',
        country: 'United States of America',
        lat: 36.208359,
        lng: -86.761642,
        name: 'Chenoweth Garden Home',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 400
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
    options.tableName = 'Spots'
    await queryInterface.bulkDelete(options, {
      ownerId: [1, 2, 3, 4, 5]
    })
  }
};
