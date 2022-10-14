const express = require('express')
const { sequelize } = require('sequelize')
const { requireAuth } = require('../../utils/auth')
const { User, Spot, Booking, Review, SpotImage, ReviewImage } = require('../../db/models')
const { check, body } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require('sequelize')

const router = express.Router()

// const validateBooking = [
//     body('endDate')
//         .custom((value, { req }) => {
//             console.log('req.body --->', req.body)
//             console.log('value --->', value)
//             const endDate = new Date(value).getTime()
//             console.log('endDate --->', endDate)
//             const startDate = new Date(req.body.startDate).getTime()
//             console.log('req.body.startDate --->', req.body.startDate)
//             console.log('startDate --->', startDate)
//             if (endDate <= startDate) {
//                 throw new Error('endDate cannot be on or before startDate')
//             }
//             return true
//         }),
//     handleValidationErrors
// ]

//get all of the current users bookings
router.get('/current', requireAuth, async (req, res, next) => {

    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description']
                }
            }
        ]
    })

    const bookingArr = []
    for (let booking of bookings) {
        const spot = await Spot.findByPk(booking.spotId)
        const spotImage = await SpotImage.findByPk(spot.id, {
            where: {
                preview: true
            }
        })

        let bookingData = booking.toJSON()
        bookingData.Spot.previewImage = spotImage.url
        bookingArr.push(bookingData)
    }

    return res.json({ Bookings: bookingArr })
})

//edit a booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {

    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        const err = new Error()
        err.message = "Booking couldn't be found"
        err.status = 404
        return next(err)
    }

    if (req.user.id !== booking.userId) {
        const err = new Error()
        err.message = "Can't edit a booking that doesn't belong to you."
        err.status = 404
        return next(err)
    }

    const { startDate, endDate } = req.body

    const startDateTime = new Date(startDate).getTime()
    const endDateTime = new Date(endDate).getTime()

    if (endDateTime < startDateTime) {
        const err = new Error()
        err.message = "endDate can't be on or before startDate"
        err.status = 400
        return next(err)
    }

    const conflictCheck = await Booking.findOne({
        where: {
            [Op.or]: [
                { startDate: startDate },
                { endDate: endDate }
            ]
        }
    })

    if (conflictCheck) {
        const err = new Error()
        err.message = "Sorry, this spot is already booked for the specified dates"
        err.status = 403
        err.errors = {
            startDate: 'Start date conflicts with an existing booking',
            endDate: 'End date conflicts with an existing booking'
        }
        return next(err)
    }

    booking.update({
        startDate,
        endDate
    })

    return res.json(booking)

})

//delete a booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {

    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        const err = new Error()
        err.message = "Booking couldn't be found"
        err.status = 404
        return next(err)
    }

    if (req.user.id !== booking.userId) {
        const err = new Error()
        err.message = "Can't delete a booking that doesn't belong to you"
        err.status = 403
        return next(err)
    }

    const currentDateTime = new Date().getTime()
    const startDateTime = new Date(booking.startDate).getTime()
    if (currentDateTime > startDateTime) {
        const err = new Error()
        err.message = "Bookings that have been started can't be deleted"
        err.status = 403
        return next(err)
    }

    await booking.destroy()


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
