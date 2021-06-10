
const express = require('express')
const coingeckoRoutes = require('./coingecko/routes')

const router = express.Router()

/**
* GET v1/external/coingecko
*/
router.use("/coingecko", coingeckoRoutes)

module.exports = router
