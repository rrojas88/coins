
const express = require('express')
const usersRoutes = require('./users/routes')
const authRoutes = require('./auth/routes')
const coinsUserRoutes = require('./coins_user/routes')
const coinsHistoryRoutes = require('./coins_history/routes')

const router = express.Router()

/**
* GET v1/local/users
*/
router.use("/users", usersRoutes)

/**
* GET v1/local/auth
*/
router.use("/auth", authRoutes)

/**
* GET v1/local/coins-user
*/
router.use("/coins-user", coinsUserRoutes)

/**
* GET v1/local/coins-history
*/
router.use("/coins-history", coinsHistoryRoutes)

module.exports = router
