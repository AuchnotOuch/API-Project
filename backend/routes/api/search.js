const express = require('express')
const { sequelize } = require('sequelize')
const { requireAuth } = require('../../utils/auth')
const { User, Spot } = require('../../db/models')
const { check, body } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require('sequelize')

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
        }
    })

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
