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
const routes = require('./routes')
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




//export the app
module.exports = app;
