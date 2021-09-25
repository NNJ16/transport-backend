const mongoose = require("mongoose");

const TravelLogSchema = new mongoose.Schema({
    cardId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'card' },
    timeTableId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'timeTable' },
    Date: { type: Date, required: true },
    noOfTerminals: { type: Number, required: true},
    fair: { type: Number, required: true},
});

const TravelLog = mongoose.model('travelLog', TravelLogSchema);
module.exports = TravelLog;