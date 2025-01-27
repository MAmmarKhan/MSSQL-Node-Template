const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dummyRouter = require('./routes/dummyRoute');

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.use((req, res, next) => {
    const timestamp = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Karachi',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3
    }).format(new Date());

    const green = '\x1b[32m';
    const red = '\x1b[31m';
    const blue = '\x1b[34m';
    const yellow = '\x1b[33m';
    const reset = '\x1b[0m';

    const clientIp = req.socket.remoteAddress || req.headers['x-forwarded-for'] || 'Unknown IP';

    const isLocalhost =
        clientIp === '127.0.0.1' || 
        clientIp === '::1' ||      
        req.hostname === 'localhost'; 

    console.log(
        `${blue}${timestamp}:${reset} Initiator: [${isLocalhost ? `${green}Localhost` : `${red}External`}${reset}], Path: ${yellow}${req.method} ${req.originalUrl}${reset}`
    );

    next();
});


app.use('/api/support', dummyRouter);

app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        //console.log(middleware.route);
    }
});

module.exports = app;
