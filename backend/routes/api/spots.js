const express = require('express')
const jwt = require('jsonwebtoken')
const { jwtConfig } = require('../../config')
const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { User, Spot, Booking, Review, SpotImage, ReviewImage } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')

const router = express.Router()


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
