const TravelLog = require("../model/travelLog.model");
const Card = require("../model/card.model");
const TimeTable = require("../model/timeTable.model");

//Register a TravelLog | guest
const createTravelLog = async (req, res) => {
    if (req.body) {
        await Card.findOne({ _id: req.body.cardId }, async (err, cardResult) => {
            if (err) {
                console.log(err);
            } else {
                if (cardResult) {
                    await TimeTable.findOne({ _id: req.body.timeTableId }, async (err, timeTableResult) => {
                        if (err) {
                            console.log(err);
                        } else {
                            if (timeTableResult) {
                                var travelLogData = req.body
                                console.log("timeTableResult");
                                console.log(timeTableResult);
                                console.log(timeTableResult.routeId.farePerTerminal);
                                travelLogData.fair = req.body.noOfTerminals * timeTableResult.routeId.farePerTerminal
                                const travelLog = new TravelLog(req.body);
                                await travelLog.save()
                                    .then(data => {
                                        console.log(data);
                                        res.status(200).send(data);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.send(err);
                                    });
                            } else {
                                console.log("TimeTable Not Exist");
                                res.send({ message: "TimeTable Not Exist" });
                            }
                        }
                    }).populate('routeId');
                } else {
                    console.log("Card Not Exist");
                    res.send({ message: "Card Not Exist" });
                }
            }
        });
    }
}

//update TravelLog Details
const updateTravelLog = async (req, res) => {
    if (req.body) {
        if (!req.body.id) return res.status(500).send("Id is missing");
        let id = req.body.id;

        updateDetails(id, req, (err, travelLog) => {
            if (err) return res.status(500).send(err);
            console.log("travelLog");
            console.log(travelLog);
            res.status(200).send(travelLog);
        })
    }
}


function updateDetails(id, req, callback) {
    TravelLog.findByIdAndUpdate(id, req.body)
        .then((result2) => {
            TravelLog.findOne({ _id: id }, (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                } else {
                    var travelLog = result;
                    console.log(travelLog);
                    return callback(null, travelLog);
                }
            });

        })
        .catch(err => {
            console.log(err)
            return callback(err);

        })
}

//get All TravelLog
const getAllTravelLog = async (req, res) => {
    await TravelLog.find().populate('timeTableId').populate('cardId')
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
}

//get All TravelLog By Card Id
const getAllTravelLogByCardId = async (req, res) => {
    await TravelLog.find({ cardId: req.body.cardId }).populate('timeTableId').populate('cardId')
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
}

//delete TravelLog
const deleteTravelLog = async (req, res) => {
    if (req.body.id) {
        await TravelLog.findByIdAndDelete(req.body.id, (err, result) => {
            if (err) return res.status(500).send(err);
            console.log(result);
            return res.status(200).send(result);
        });
    }
}

module.exports = {
    createTravelLog,
    updateTravelLog,
    deleteTravelLog,
    getAllTravelLogByCardId,
    getAllTravelLog
}