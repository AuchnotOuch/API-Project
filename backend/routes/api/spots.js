const express = require('express')
const { Sequelize } = require('sequelize')
const { requireAuth } = require('../../utils/auth')
const { User, Spot, Booking, Review, SpotImage, ReviewImage } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')

const router = express.Router()

const validateCreateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is required'),
    check('lat')
        .isDecimal({ force_decimal: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is required'),
    check('lng')
        .isDecimal({ force_decimal: true })
        .withMessage('Latitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a name'),
    check('name')
        .isLength({ max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors


]

//get all spots of current user
router.get('/current', requireAuth, async (req, res, next) => {
    const ownerId = req.user.id

    const Spots = await Spot.findAll({
        where: {
            ownerId: ownerId
        }
    })
    return res.json({ Spots })
})

//get details of a spot from spot id
router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params

    const spotAggregateData = await Spot.findByPk(spotId, {
        include: [
            {
                model: Review,
                attributes: []
            },
        ],
        attributes: [
            [Sequelize.fn("COUNT", Sequelize.col("Reviews.id")), "numReviews"],
            [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgStarRating"]
        ],
        raw: true
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
            }
        ]
    })

    if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.message = "Spot couldn't be found."
        err.statusCode = 404
        return next(err)
    }

    let spotData = spot.toJSON()
    spotData.numReviews = spotAggregateData.numReviews
    spotData.avgStarRating = spotAggregateData.avgStarRating
    return res.json(spotData)
})

//create new spot
router.post('/', [requireAuth, validateCreateSpot], async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const ownerId = req.user.id
    const owner = await User.findOne({
        where: {
            id: ownerId
        }
    })
    console.log(owner)
    const newSpot = await Spot.create({
        ownerId: ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    return res.json(newSpot)
})

//edit a spot
router.put('/:spotId', [requireAuth, validateCreateSpot], async (req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        const err = new Error()
        err.message = "Spot couldn't be found"
        err.statusCode = 404
        return next(err)
    }

    if (req.user.id !== spot.ownerId) {
        const err = new Error()
        err.message = "Can't edit a spot that doesn't belong to you."
        err.status = 401
        return res.json(err)
    }

    spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    return res.json(spot)

})
//delete a spot
//get all spots
router.get('/', async (req, res, next) => {

    const spots = await Spot.findAll()
    const spotArr = []
    for (let spot of spots) {
        const spotAggregateData = await Spot.findAll({
            where: {
                id: spot.id
            },
            include: [
                {
                    model: Review,
                    attributes: []
                },
            ],
            attributes: [
                [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"]
            ],
            raw: true
        })
        const spotImage = await SpotImage.findByPk(spot.id, {
            where: {
                preview: true
            }
        })
        let spotData = spot.toJSON()
        spotData.previewImage = spotImage.url
        spotData.avgRating = spotAggregateData[0].avgRating
        spotArr.push(spotData)
    }
    // console.log(spots)
    return res.json({ Spots: spotArr })
})

// router.use((err, req, res, next) => {
//     console.error(err)
//     res.status(err.status || 500)
//     return res.json(err)
// })

module.exports = router
