const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const applicationRouter = require('./routers/applicationRouter');
const router = express.Router();

const app = express();

mongoose.connect('mongodb://localhost:27017/noahsark', {
        useNewUrlParser: true
    })
    .catch(error => {
        console.error(error);
    });

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use('/api/v1/applications', applicationRouter);


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});


app.listen(8001, err => (err ? console.log('Error happened', err) : console.log('Server is up on 8081')));