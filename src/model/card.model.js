const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    cardNumber: { type: String, required: true, unique:true },
    expireDate: { type: Date, required: true },
    type: { type: String, required: true}
});

const Card = mongoose.model('card', CardSchema);
module.exports = Card;