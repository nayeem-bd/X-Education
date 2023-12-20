const express = require('express');
const cookieParser = require('cookie-parser');

const userRoute = require('./route/userRoute');
const courseRoute = require('./route/courseRoute');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//adding requestTime
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/user', userRoute);
app.use('/api/course',courseRoute);

app.use('*', (req, res) => {
    return res.status(404).json({
        status:'error',
        message:'route is not defined'
    });
});


module.exports = app;