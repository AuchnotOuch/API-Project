const express = require('express')
const { Sequelize } = require('sequelize')
const { requireAuth } = require('../../utils/auth')
const { User, Spot, Booking, Review, SpotImage, ReviewImage } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
// const { Router } = require('express')

const router = express.Router()

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Rating required'),
    check('stars')
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

//get all reviews of current user
router.get('/current', requireAuth, async (req, res, next) => {

    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                }
            },
            {
                model: User,
                attributes: {
                    exclude: ['user', 'email', 'hashedPassword', 'token', 'createdAt', 'updatedAt', 'username']
                }
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'reviewId']

                }
            }
        ]
    })

    const reviewArr = []
    for (let review of reviews) {
        const spot = await Spot.findByPk(review.spotId)
        const spotImage = await SpotImage.findByPk(spot.id, {
            where: {
                preview: true
            }
        })

        let reviewData = review.toJSON()
        reviewData.Spot.previewImage = spotImage.url
        reviewArr.push(reviewData)
    }

    return res.json({ Reviews: reviewArr })
})

//edit a review
router.put('/:reviewId', [requireAuth, validateReview], async (req, res, next) => {

    const reviewToEdit = await Review.findByPk(req.params.reviewId)

    if (!reviewToEdit) {
        const err = new Error()
        err.message = "Review couldn't be found"
        err.status = 404
        return next(err)
    }
    if (req.user.id !== reviewToEdit.userId) {
        const err = new Error()
        err.message = "Can't edit a review that doesn't belong to you."
        err.status = 401
        return next(err)
    }

    const { review, stars } = req.body

    reviewToEdit.update({
        review,
        stars
    })
    console.log(reviewToEdit)
    return res.json(reviewToEdit)

})

//add image to review based on review id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

    const review = await Review.findByPk(req.params.reviewId)

    if (!review) {
        const err = new Error()
        err.message = "Review couldn't be found"
        err.status = 404
        return next(err)
    }
    if (req.user.id !== review.userId) {
        const err = new Error()
        err.message = "Can't add an image to a review that doesn't belong to you."
        err.status = 401
        return next(err)
    }

    const currentImages = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    })

    if (currentImages.length > 9) {
        const err = new Error()
        err.message = "Maximum number of images for this resource was reached"
        err.status = 403
        return next(err)
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

//delete review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {

    const review = await Review.findByPk(req.params.reviewId)

    if (!review) {
        const err = new Error()
        err.message = "Review couldn't be found"
        err.status = 404
        return next(err)
    }
    if (req.user.id !== review.userId) {
        const err = new Error()
        err.message = "Can't delete a review that doesn't belong to you."
        err.status = 401
        return next(err)
    }

    await review.destroy()

    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })

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
