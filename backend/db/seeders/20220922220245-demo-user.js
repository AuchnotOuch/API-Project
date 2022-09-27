'use strict';
const bcrypt = require('bcryptjs')
const { Op } = require('express')

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
    await queryInterface.bulkInsert('Users', [
      {
<<<<<<< HEAD
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo',
        lastName: 'Lition'
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'User',
        lastName: '1'
=======
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password1'),
        firstName: 'Fake',
        lastName: 'User1'
>>>>>>> dev
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
<<<<<<< HEAD
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'User',
        lastName: '2'
      }
=======
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Fake',
        lastName: 'User2'
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Fake',
        lastName: 'User3'
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'Fake',
        lastName: 'User4'
      },
      {
        email: 'user5@user.io',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'Fake',
        lastName: 'User5'
      },
>>>>>>> dev
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', {
      username: ['FakeUser1', 'FakeUser2', 'FakeUser3', 'FakeUser4', 'FakeUser5']
    })
  }
};
