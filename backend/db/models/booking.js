'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Spots'
      },
      onDelete: 'CASCADE',
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users'
      },
      onDelete: 'CASCADE',
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      validate: {
        validStartDate(value) {
          const currentTime = Date()
          if (value.getTime() > currentTime.getTime()) {
            throw new Error('Start date must be past current date')
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      validate: {
        validEndDate(value) {
          const currentTime = Date()
          if (value.getTime() > currentTime.getTime()) {
            throw new Error('End date must be past current date')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
    indexes: [
      {
        unique: true,
        fields: ['spotId', 'startDate', 'endDate']
      }
    ]
  });
  return Booking;
};
