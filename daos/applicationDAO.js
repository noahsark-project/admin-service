const ApplicationModel = require('../models/applicationModel');
const BaseDAO = require('noahsark-common/libs/core/baseDAO');
const util = require('util');

function ApplicationDAO(Model){
    BaseDAO.call(this, Model);
}
util.inherits(ApplicationDAO,BaseDAO);

module.exports = new ApplicationDAO(ApplicationModel);
