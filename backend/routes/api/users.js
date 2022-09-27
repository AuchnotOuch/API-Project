const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { User } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')

const router = express.Router()
//validate user signup keys
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more'),
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Must provide a first name.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Must provide a last name.'),
    handleValidationErrors
]
//signs up user
router.post('/', validateSignup, async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;
    const userEmailCheck = await User.findOne({
        where: {
            email: email
        }
    })
    const userNameCheck = await User.findOne({
        where: {
            username: username
        }
    })
    if (userNameCheck && userEmailCheck) {
        const err = new Error()
        err.message = "User already exists"
        err.status = 403
        err.errors = {
            email_username: "User with that username and email already exists"
        }
        return next(err)
    }
    if (userEmailCheck) {
        const err = new Error()
        err.message = "User already exists"
        err.status = 403
        err.errors = {
            email: "User with that email already exists"
        }
        return next(err)
    }
    if (userNameCheck) {
        const err = new Error()
        err.message = "User already exists"
        err.status = 403
        err.errors = {
            username: "User with that username already exists"
        }
        return next(err)
    }

    const user = await User.signup({
        email,
        username,
        password,
        firstName,
        lastName
    })
    const token = await setTokenCookie(res, user)

    user.token = token
    return res.json(user)
})

// router.get('/', async (req, res) => {
//     const users = await User.findAll()
//     return res.json(users)
// })

router.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500)
    return res.json(err)
})

module.exports = router
