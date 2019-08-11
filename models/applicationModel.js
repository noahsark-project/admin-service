const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    name: String,
    clientId: String,
    clientSecret: String,
    redirectUris: {
        type: [String]
    },
    grants: {
        type: [String],
        default: ['authorization_code', 'password', 'refresh_token', 'client_credentials', 'implicit']
    },
    scope: String,
    is3rdPart: {
        type: Boolean,
        default: false
    }
});

const ApplicationModel = mongoose.model('Application', applicationSchema);
module.exports = ApplicationModel;