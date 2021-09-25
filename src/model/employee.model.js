const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique:true},
    mobileNumber: { type: Number, required: true},
    type: { type: String, required: true},
    password: {type:String, required:true}
});

const Employee = mongoose.model('employee', EmployeeSchema);
module.exports = Employee;