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

    const spots = await Spot.findAll({
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
        }
    })

    const results = []

    for (let spot of spots) {
        const spotImage = await SpotImage.findByPk(spot.id, {
            where: {
                preview: true
            }
        })
        let spotData = spot.toJSON()
        spotData.previewImage = spotImage.url
        results.push(spotData)
    }
    console.log(results)
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
