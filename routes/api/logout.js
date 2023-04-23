const express = require('express')
const router = express()
const logoutController = require('../../controller/logoutController')

router.get('/',logoutController.handleLogout)

module.exports = router