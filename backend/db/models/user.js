'use strict';
const bcrypt = require('bcryptjs')
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    //method that returns an object that with user info that
    //is safe to save to a JWT
    toSafeObject() {
      const { id, username, email } = this
      return { id, username, email }
    }
    // checks if password provided by user matches hashed password
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString())
    }
    // returns current user using currentUser scope
    static getCurrentUserById(id) {
      return User.scope('currentUser').findByPk(id)
    }
    // logs in user if user exists and password is validated
    static async login({ credential, password }) {
      const { Op } = require('sequelize')
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id)
      }
    }
    // creates user from provided credentials and hashes password
    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password)
      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName
      })
      return await User.scope('currentUser').findByPk(user.id)
    }
    static associate(models) {
      // define association here
      User.hasMany(
        models.Spot,
        { foreignKey: 'ownerId', onDelete: 'CASCADE' }
      )
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Can't be an email!")
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'updatedAt', 'createdAt', 'email']
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ['hashedPassword']
        }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};
