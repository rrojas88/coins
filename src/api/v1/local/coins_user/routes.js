
const express = require('express')

const authMidd = require('../../../../middlewares/auth')
const controller = require('./infrastructure/controllers')

const routes = express.Router()

/**
* @apidoc
* @api {get} /local/coins-user/get-user-coins Listar las monedas asociadas a un usuario (No actualiza la BD)
* @apiVersion 0.1.0
* @APIGroup CoinsUser
*/
routes.get('/get-user-coins', authMidd, (req, res, next) => {
	controller.getAllRows(req, res, next)
})

/**
* @apidoc
* @api {get} /local/coins-user/get-prices-user-coins Consultar el precio actual de todas las monedas de un usuario y los actualiza en la BD
* @apiVersion 0.1.0
* @APIGroup CoinsUser
*/
routes.get('/get-prices-user-coins', authMidd, (req, res, next) => {
	controller.getCurrentPricesByID(req, res, next)
})

/**
* @apidoc
* @api {get} /local/coins-user/get-history-by-coin-id/:idcoin Consultar el Historico de precios de una moneda de un usuario
* @apiVersion 0.1.0
* @APIGroup CoinsUser
* @apiParam {String} idcoin ID (String del identificador, ejemplo: "ripple" ) de la moneda a consultarse.
*/
routes.get('/get-history-by-coin-id/:idcoin', authMidd, (req, res, next) => {
	controller.getRowByID(req, res, next)
})

/**
* @apidoc
* @api {post} /local/coins-user Permite a un usuario agregarse una o varias monedas por medio del "IdCoin"
* @apiVersion 0.1.0
* @APIGroup CoinsUser
* @apiParam {Array} coins_id IDs (Array con String de los identificadores, ejemplo: ["ripple"]) de las monedas a agregarse.
*/
routes.post('/', authMidd, (req, res, next) => {
	controller.createRow(req, res, next)
})

module.exports = routes
