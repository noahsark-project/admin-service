const appDAO = require('./applicationDAO');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/serai', {
        useNewUrlParser: true
    })
    .catch(error => {
        console.error(error);
    });

appDAO.test('name', 'http://localhost:8080');