const Passenger = require("../model/passenger.model");
const bcrypt = require("bcryptjs");
const saltRounds = 5;

//Register a Passenger | guest
const createPassenger = async (req, res) => {
    if (req.body) {
        let email = req.body.email;
        await Passenger.findOne({ email: email }, async (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (!result) {

                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, async function (err, hash) {
                            req.body.password = hash;

                            const passenger = new Passenger(req.body);
                            await passenger.save()
                                .then(data => {
                                    console.log(data);
                                    res.status(200).send(data);
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.send(err);
                                });
                        });
                    });
                } else {
                    console.log("Passenger Already Exist");
                    res.send({ message: "Passenger Already Exist" });
                }
            }
        });
    }
}

//login Validate
const validatePassenger = async (req, res) => {
    await Passenger.findOne({ email: req.body.email }, (err, passengers) => {
        if (err) {
            console.log(err);
        } else {
            bcrypt.compare(req.body.password, passengers.password, function (err, result) {
                // result == true
                console.log(result);
                if (result) {
                    console.log(passengers);
                    res.send(passengers);
                } else {
                    console.log("Credentials Does Not Matched");
                    res.status(500).send("Credentials Does Not Matched");
                }
            });

        }
    });
}

//update Passenger Details
const updatePassenger = async (req, res) => {
    if (req.body) {
        if (!req.body.id) return res.status(500).send("Id is missing");
        let id = req.body.id;
        if (req.body.password != null) {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(req.body.password, salt, async function (err, hash) {
                    req.body.password = hash;
                    updateDetails(id, req, (err, passenger) => {
                        if (err) return res.status(500).send(err);
                        console.log("passenger");
                        console.log(passenger);
                        res.status(200).send(passenger);
                    })

                });
            });
        } else {
            updateDetails(id, req, (err, passenger) => {
                if (err) return res.status(500).send(err);
                console.log("passenger");
                console.log(passenger);
                res.status(200).send(passenger);
            })
        }
        console.log(req.body);


    }
}

function updateDetails(id, req, callback) {
    Passenger.findByIdAndUpdate(id, req.body)
        .then((result2) => {
            Passenger.findOne({ _id: id }, (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                } else {
                    if (result && result.password) result.password = '';
                    var passenger = result;
                    // delete passenger.password;
                    console.log(passenger);
                    return callback(null, passenger);
                }
            });

        })
        .catch(err => {
            console.log(err)
            return callback(err);

        })
}

//get All Passenger
const getAllPassenger = async (req, res) => {
    await Passenger.find()
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
}

//delete Passenger
const deletePassenger = async (req, res) => {
    if (req.body.id) {
        await Passenger.findByIdAndDelete(req.body.id, (err, result) => {
            if (err) return res.status(500).send(err);
            console.log(result);
            return res.status(200).send(result);
        });
    }
}

module.exports = {
    createPassenger,
    updatePassenger,
    deletePassenger,
    getAllPassenger,
    validatePassenger
}