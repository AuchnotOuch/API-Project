'use strict';
const bcrypt = require('bcryptjs')
const { Op } = require('express')

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
    options.tableName = 'Users'
    await queryInterface.bulkInsert(options, [
      {
        email: 'demosmith@user.io',
        username: 'demosmith',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo',
        lastName: 'Smith'
      },
      {
        email: 'john@user.io',
        username: 'johnsmith',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'John',
        lastName: 'Smith'
      },
      {
        email: 'jane@user.io',
        username: 'janesmith',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Jane',
        lastName: 'Smith'
      },
      {
        email: 'karen@user.io',
        username: 'karensmith',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Karen',
        lastName: 'Smith'
      },
      {
        email: 'Ken@user.io',
        username: 'kensmith',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Ken',
        lastName: 'Smith'
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users'
    await queryInterface.bulkDelete(options, {
      username: ['demosmith', 'johnsmith', 'janesmith', 'karensmith', 'kensmith']
    })
  }
};
