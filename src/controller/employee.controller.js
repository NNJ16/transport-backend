const Employee = require("../model/employee.model");
const bcrypt = require("bcryptjs");
const saltRounds = 5;

//Register a Employee | guest
const createEmployee = async (req, res) => {
    if (req.body) {
        let email = req.body.email;
        await Employee.findOne({ email: email }, async (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (!result) {

                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, async function (err, hash) {
                            req.body.password = hash;

                            const employee = new Employee(req.body);
                            await employee.save()
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
                    console.log("Employee Already Exist");
                    res.send({ message: "Employee Already Exist" });
                }
            }
        });
    }
}

//login Validate
const validateEmployee = async (req, res) => {
    await Employee.findOne({ email: req.body.email }, (err, employee) => {
        if (err) {
            console.log(err);
        } else {
            bcrypt.compare(req.body.password, employee.password, function (err, result) {
                // result == true
                console.log(result);
                if (result) {
                    console.log(employee);
                    res.send(employee);
                } else {
                    console.log("Credentials Does Not Matched");
                    res.status(500).send("Credentials Does Not Matched");
                }
            });

        }
    });
}

//update Employee Details
const updateEmployee = async (req, res) => {
    if (req.body) {
        if (!req.body.id) return res.status(500).send("Id is missing");
        let id = req.body.id;
        if (req.body.password != null) {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(req.body.password, salt, async function (err, hash) {
                    req.body.password = hash;
                    updateDetails(id, req, (err, employee) => {
                        if (err) return res.status(500).send(err);
                        console.log("employee");
                        console.log(employee);
                        res.status(200).send(employee);
                    })

                });
            });
        } else {
            updateDetails(id, req, (err, employee) => {
                if (err) return res.status(500).send(err);
                console.log("employee");
                console.log(employee);
                res.status(200).send(employee);
            })
        }
        console.log(req.body);


    }
}

function updateDetails(id, req, callback) {
    Employee.findByIdAndUpdate(id, req.body)
        .then((result2) => {
            Employee.findOne({ _id: id }, (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                } else {
                    if (result && result.password) result.password = '';
                    var employee = result;
                    // delete employee.password;
                    console.log(employee);
                    return callback(null, employee);
                }
            });

        })
        .catch(err => {
            console.log(err)
            return callback(err);

        })
}

//get All Employee
const getAllEmployee = async (req, res) => {
    await Employee.find()
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
}

//delete Employee
const deleteEmployee = async (req, res) => {
    if (req.body.id) {
        await Employee.findByIdAndDelete(req.body.id, (err, result) => {
            if (err) return res.status(500).send(err);
            console.log(result);
            return res.status(200).send(result);
        });
    }
}

module.exports = {
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployee,
    validateEmployee
}