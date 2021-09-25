const express = require('express');
const router = express.Router();
const EmployeeController = require('../controller/employee.controller');

module.exports = function (){
    router.get('/', EmployeeController.getAllEmployee);
    router.post('/create', EmployeeController.createEmployee);
    router.post('/update', EmployeeController.updateEmployee);
    router.post('/validate', EmployeeController.validateEmployee);
    router.post('/delete',EmployeeController.deleteEmployee);
    return router;
}
