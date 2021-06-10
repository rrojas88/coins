
const express = require('express')

const authMidd = require('../../../../middlewares/auth')
const controller = require('./infrastructure/controllers')

const routes = express.Router()

/*
* Consultar un registro de Historico por su Id
*/
routes.get('/by-id/:id', authMidd, (req, res, next) => {
	controller.getRowByID(req, res, next)
})

/*
* Almacenar un registro de Historico a la moneda de un Usuario
*/
routes.post('/', authMidd, (req, res, next) => {
	controller.createRow(req, res, next)
})

module.exports = routes
