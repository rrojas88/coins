
const express = require('express')
const localRoutes = require('./local/routes')
const externalRoutes = require('./external/routes')

const router = express.Router()

/**
* GET v1/local
*/
router.use("/local", localRoutes)

/**
* GET v1/external
*/
router.use("/external", externalRoutes)

module.exports = router
