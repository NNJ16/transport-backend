const express = require('express');
const router = express.Router();
const TravelLogController = require('../controller/travelLog.controller');

module.exports = function (){
    router.get('/', TravelLogController.getAllTravelLog);
    router.post('/getAllTravelLogByCardId', TravelLogController.getAllTravelLogByCardId);
    router.post('/create', TravelLogController.createTravelLog);
    router.post('/update', TravelLogController.updateTravelLog);
    router.post('/delete',TravelLogController.deleteTravelLog);
    return router;
}
