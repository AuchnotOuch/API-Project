const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

router.use('/api', apiRouter)
//serve react build files in production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    //serve frontend index.html at root route
    router.get('/', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken())
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        )
    })
    //serve static assets in frontend build folder
    router.use(express.static(path.resolve('../frontend/build')))
    //serve frontend index.html at all other routes not starting with /api
    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken())
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        )
    })
}
// add XSRF-TOKEN in development
if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken())
        return res.json({})
    })
}

router.get('/api/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    })
})



module.exports = router;
