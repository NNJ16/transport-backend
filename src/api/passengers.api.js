const express = require('express');
const router = express.Router();
const PassengerController = require('../controller/passenger.controller');

module.exports = function (){
    router.get('/', PassengerController.getAllPassenger);
    router.post('/create', PassengerController.createPassenger);
    router.post('/update', PassengerController.updatePassenger);
    router.post('/validate', PassengerController.validatePassenger);
    router.post('/delete',PassengerController.deletePassenger);
    return router;
}
