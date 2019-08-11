
const applicationDAO = require('../daos/applicationDAO');
const DuplicatedError = require('noahsark-common/libs/errors/DuplicatedError');
const encrypt = require('noahsark-common/libs/utils/encrypt');
const crypto= require('crypto');

function ApplicationController(){
    this.registry = async function(name, redirectUris){
        const isNameExisted = await applicationDAO.isExisted('name',name);
        if(isNameExisted){
            throw new DuplicatedError(`appliction name ${name} exists`);
        }
        for (let i = 0; i < redirectUris.length; i++) {
            const redirectUri = redirectUris[i];
            const redirectUriExisted = await applicationDAO.isExisted('redirectUris',redirectUri);
            if(redirectUriExisted){
                throw new DuplicatedError(`redirectUri ${redirectUri} exists`);
            }
        } 
        const appliction = {'name': name, 'redirectUris':redirectUris};
        appliction.clientId = encrypt.md5(crypto.randomBytes(16)); // 32 chars
        appliction.clientSecret = encrypt.sha256(crypto.randomBytes(32)); // 64 chars
        appliction.scope = 'profile';
        try{
            const newAppliction = await applicationDAO.create(appliction);
            return newAppliction;
        }catch(e){
            throw e;
        }
    };
}

module.exports = new ApplicationController();