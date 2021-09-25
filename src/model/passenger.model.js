const mongoose = require("mongoose");

const PassengerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique:true},
    mobileNumber: { type: Number, required: true},
    type: { type: String, required: true},
    password: {type:String, required:true},
    cardNo: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'card'}
});

const Passenger = mongoose.model('passenger', PassengerSchema);
module.exports = Passenger;