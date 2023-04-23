const express = require('express')
const router = express()
const refreshTokenController = require('../../controller/refreshTokenController')

router.get('/',refreshTokenController.handleRefreshToken)

module.exports = router;