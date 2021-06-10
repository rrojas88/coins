
const express = require('express')

const authMidd = require('../../../../middlewares/auth')
const controller = require('./infrastructure/controllers')

const routes = express.Router()

/**
* @apidoc
* @api {get} /external/coingecko/get-available-coins Consultar todas la monedas disponibles (Orden por default: desc)
* @apiVersion 0.1.0
* @APIGroup API Externa
*/
routes.get('/get-available-coins', authMidd, (req, res, next) => {
	controller.getAllRows(req, res, next)
})

/**
* @apidoc
* @api {get} /external/coingecko/get-available-coins/:order Consultar todas la monedas disponibles (En un "Orden" dado)
* @apiVersion 0.1.0
* @APIGroup API Externa
* @apiParam {String="asc","desc"} order Orden para mostrar.
*/
routes.get('/get-available-coins/:order', authMidd, (req, res, next) => {
	controller.getAllRows(req, res, next)
})

/**
* @apidoc
* @api {get} /external/coingecko/get-available-coins/:order/page/:page Consultar todas la monedas disponibles (En un "Orden" y una "Pagina" dada)
* @apiVersion 0.1.0
* @APIGroup API Externa
* @apiParam {String="asc","desc"} order Orden para mostrar.
* @apiParam {Number} page Página a mostrar.
*/
routes.get('/get-available-coins/:order/page/:page', authMidd, (req, res, next) => {
	controller.getAllRows(req, res, next)
})

/**
* @apidoc
* @api {post} /external/coingecko/get-data-by-ids-coin Consultar la información de una o varias monedas por sus IDs (Identificadores de monedas separados por comas, ejemplo: "ripple,bitcoin")
* @apiVersion 0.1.0
* @APIGroup API Externa
* @apiParam {String} coins_id IDs (identificadores, ejemplo: ["ripple"]) de las monedas a consultarse.
*/
routes.post('/get-data-by-ids-coin', authMidd, (req, res, next) => {
	controller.getDataCoinByIds(req, res, next)
})

module.exports = routes
