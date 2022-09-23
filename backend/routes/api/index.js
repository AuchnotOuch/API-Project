const router = require('express').Router();
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js')
const { User } = require('../../db/models')

//user session restore
router.use(restoreUser)
//router for session resource
router.use('/session', sessionRouter)
//router for users resource
router.use('/users', usersRouter)

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
