const router = require('express').Router();
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')
const spotsRouter = require('./spots.js')
const reviewsRouter = require('./reviews.js')
const spotImagesRouter = require('./spot-images')
const reviewImagesRouter = require('./review-images')
const bookingsRouter = require('./bookings')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js')
const { User } = require('../../db/models')

//user session restore
router.use(restoreUser)
//router for session resource
router.use('/session', sessionRouter)
//router for users resource
router.use('/users', usersRouter)
//router for spots resource
router.use('/spots', spotsRouter)
//router for reviews resource
router.use('/reviews', reviewsRouter)
//router for spot images resource
router.use('/spot-images', spotImagesRouter)
//router for review images resource
router.use('/review-images', reviewImagesRouter)
//router for bookings resource
router.use('/bookings', bookingsRouter)

router.post('/test', (req, res) => {
    res.json({
        requestBody: req.body
    })
})
//THE FOLLOWING COMMENTED MIDDLEWARE ARE TESTS:

// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user)
// })
// router.get('/restore-user', (req, res) => {
//     return res.json(req.user)
// })


// router.get('/set-token-cookie', async (req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     })
//     setTokenCookie(res, user)
//     return res.json({ user })
// })



module.exports = router
