const express = require('express')
const { sequelize } = require('sequelize')
const jwt = require('jsonwebtoken')
const { jwtConfig } = require('../../config')
const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { User, Spot, Booking, Review, SpotImage, ReviewImage } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')

const router = express.Router()
//get details of a spot from spot id
router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params

    const reviewCount = await Review.count({
        where: {
            id: spotId
        }
    })
    const spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: User,
                as: 'Owner',
                attributes: {
                    exclude: ['token', 'username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
                }
            },
            {
                model: SpotImage,
                as: 'SpotImages',
                attributes: {
                    exclude: ['id', 'createdAt', 'updatedAt', '']
                }
            },
            {
                model: Review,
                attributes: []
            },
        ],
        attributes: [
            [
                sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"
            ]
        ]
    })

    if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.message = "Spot couldn't be found."
        err.statusCode = 404
        return next(err)
    }

    return res.json(spot)
})

//get all spots of current user
router.get('/current', requireAuth, async (req, res, next) => {
    // const token = res.cookie('token')
    // const payload = jwt.decode(token)
    const ownerId = req.user.id

    const Spots = await Spot.findAll({
        where: {
            ownerId: ownerId
        }
    })
    return res.json({ Spots })
})

//get all spots
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll()

    return res.json({ spots })
})

module.exports = router
