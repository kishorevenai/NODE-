const express = require('express');
const router = express();
const registerController = require('../../controller/registerController')

router.post('/', registerController.handleNewUser)

module.exports = router