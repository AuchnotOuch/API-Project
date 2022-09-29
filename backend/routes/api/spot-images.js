const express = require('express')
const { requireAuth } = require('../../utils/auth')
const { User, Spot, Booking, Review, SpotImage, ReviewImage } = require('../../db/models')

const router = express.Router()

//delete an existing image for a spot
router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const image = await SpotImage.findByPk(req.params.imageId)

    if (!image) {
        const err = new Error()
        err.message = "Spot image couldn't be found"
        err.status = 404
        res.statusCode = 404
        return res.json(err)
    }

    const spot = await Spot.findByPk(image.spotId)

    if (req.user.id !== spot.ownerId) {
        const err = new Error()
        err.message = "Can't delete an image to a spot that doesn't belong to you."
        err.status = 403
        res.statusCode = 403
        return res.json(err)
    }


    await image.destroy()

    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

module.exports = router
