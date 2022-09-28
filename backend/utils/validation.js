const { validationResult } = require('express-validator')

//format errors from express validator
const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => `${error.msg}`)
        const err = Error('Bad request.')
        err.message = "Validation Error"
        err.errors = errors
        err.status = 400
        err.status_code = 400
        err.title = 'Bad request'
        next(err)
    }
    next()
}

module.exports = { handleValidationErrors }
