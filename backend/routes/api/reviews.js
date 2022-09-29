const express = require('express')
const { Sequelize } = require('sequelize')
const { requireAuth } = require('../../utils/auth')
const { User, Spot, Booking, Review, SpotImage, ReviewImage } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { Router } = require('express')

const router = express.Router()

//get all reviews of current user
router.get('/current', requireAuth, async (req, res, next) => {

    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: {}
            },
            {
                model: User,
                attributes: {}
            }
            // {
            //     model: ReviewImage,
            //     attributes: {}
            // }
        ]
    })

    return res.json({ Reviews: reviews })
})

//add image to review based on review id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

    const review = await Review.findByPk(req.params.reviewId)

    if (!review) {
        const err = new Error()
        err.message = "Review couldn't be found"
        err.status = 404
        return res.json(err)
    }
    if (req.user.id !== review.userId) {
        console.log(review.userId)
        const err = new Error()
        err.message = "Can't add an image to a review that doesn't belong to you."
        err.status = 401
        return res.json(err)
    }

    const currentImages = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    })

    if (currentImages.length > 9) {
        const err = new Error()
        err.message = "Maximum number of images for this resource was reached"
        err.status = 401
        return res.json(err)
    }
    const { url } = req.body
    const image = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url
    })
    const returnedImage = await ReviewImage.findByPk(image.id, {
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'reviewId']
        }
    })
    return res.json(returnedImage)
})


module.exports = router
