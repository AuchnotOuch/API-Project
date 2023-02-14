const express = require('express')
const { Sequelize } = require('sequelize')
const { requireAuth } = require('../../utils/auth')
const { User, Spot, SpotImage, Review } = require('../../db/models')
const { check, body } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require('sequelize')
const spotimage = require('../../db/models/spotimage')

const router = express.Router()


router.get('/', async (req, res, next) => {
    const query = req.query.q

    const results = await Spot.findAll({
        where: {
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${query}%`
                    }
                },
                {
                    city: {
                        [Op.like]: `%${query}%`
                    }
                },
                {
                    state: {
                        [Op.like]: `%${query}%`
                    }
                }
            ]
        },
        include: [
            {
                model: SpotImage,
                as: 'SpotImages'
            },
        ],
    })

    // const results = []

    // for (let spot of spots) {
    //     const aggregateData = await Spot.findAll({
    //         where: {
    //             id: spot.id
    //         },
    //         include: [
    //             // {
    //             //     model: User,
    //             //     as: 'Owner',
    //             //     attributes: {
    //             //         exclude: ['token', 'username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
    //             //     }
    //             // },
    //             {
    //                 model: Review,
    //                 attributes: []
    //             }
    //         ],
    //         attributes: [
    //             [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"]
    //         ],
    //         raw: true
    //     })
    //     const spotImage = await SpotImage.findByPk(spot.id, {
    //         where: {
    //             preview: true
    //         }
    //     })
    //     let spotData = spot.toJSON()
    //     spotData.previewImage = spotImage.url
    //     spotData.avgRating = aggregateData[0].avgRating
    //     results.push(spotData)
    // }
    return res.json({ results: results })
})

router.use((err, req, res, next) => {
    console.error(err)
    const statusCode = err.status
    const errors = err.errors
    res.statusCode = statusCode
    res.json({
        message: err.message,
        statusCode,
        errors
    })
})

module.exports = router
