const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { User, Spot, Booking, Review, SpotImage, ReviewImage } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')

const router = express.Router()

router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll()

    return res.json({ spots })
})

module.exports = router
