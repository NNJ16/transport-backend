const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');

module.exports = function (){
    router.get('/', UserController.getAllUser);
    router.post('/create', UserController.createUser);
    router.post('/update', UserController.updateUser);
    router.post('/validate', UserController.validateUser);
    router.post('/delete',UserController.deleteUser);
    return router;
}
