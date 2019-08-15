const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.post('/',
    [
        check('name').isString().isLength({min:1}),
        check('redirectUris').isArray()
    ],async (req, res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try{
            const newAppliction = await applicationController.registry(req.body.name,req.body.redirectUris);
            res.json(newAppliction);
        }catch(e){
            if(e.code === 804){
                res.json(e);
            }
        }
    }
);

module.exports = router;