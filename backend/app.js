const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const isProduction = environment === 'production';
//initialize express app
const app = express();
//import routes
const routes = require('./routes');
const { ValidationError } = require('sequelize');
const e = require('express');
//logger for info about requests and responses
app.use(morgan('dev'));
//parses cookies
app.use(cookieParser());
//parses JSON request bodies
app.use(express.json());
//SECURITY MIDDLEWARE
//*******************//
//enables cors only in development
if (!isProduction) {
    app.use(cors());
}
//sets a variety of headers to better secure app
app.use(helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
}))
//set _csrf token and create req.csrfToken method
app.use(csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
    }
}));
//connect routers
app.use(routes);

//ERROR HANDLING
//**************
//catch unhandled requests and forward to error handler
app.use((req, res, next) => {
    const err = new Error("The requested resource couldn't be found.")
    err.title = "Resource Not Found"
    err.errors = ["The requested resource couldn't be found."]
    err.status = 404
    next(err)
})
//process sequelize errors
app.use((err, req, res, next) => {
    //is sequelize error?
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message)
        err.title = 'Validation Error'
    }
    next(err)
})
//error formatter
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    console.error(err)
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    })
})





//export the app
module.exports = app;
