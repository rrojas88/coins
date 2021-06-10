
const express = require('express')

const authMidd = require('../../../../middlewares/auth')
const controller = require('./infrastructure/controllers')

const routes = express.Router()

/**
* @apidoc
* @api {get} /local/users Obtener todos los usuarios
* @apiVersion 0.1.0
* @APIGroup Users
*/
routes.get('/', authMidd, (req, res, next) => {
	controller.getAllRows(req, res, next)
})

/**
* @apidoc
* @api {get} /local/users/by-id/:id Obtener un usuario por su Id
* @apiVersion 0.1.0
* @APIGroup Users
* @apiParam {Number} id Identificador del usuario.
*/
routes.get('/by-id/:id', authMidd, (req, res, next) => {
	controller.getRowByID(req, res, next)
})

/**
* @apidoc
* @api {post} /local/users Crear un usuario
* @apiVersion 0.1.0
* @APIGroup Users
* @apiParam {String} names Nombres.
* @apiParam {String} surnames Apellidos.
* @apiParam {String} username Nombre de usuario (Nickname).
* @apiParam {String} password Contraseña (min 8 caractares).
* @apiParam {String="Pesos Argentinos (ARS)","Dolares (USD)", "Euros (EUR)"} currency Moneda.
*/
routes.post('/', (req, res, next) => {
	controller.createRow(req, res, next)
})

/**
* @apidoc
* @api {put} /local/users/:id Editar un usuario
* @apiVersion 0.1.0
* @APIGroup Users
* @apiParam {String} names Nombres.
* @apiParam {String} surnames Apellidos.
* @apiParam {String} username Nombre de usuario (Nickname).
* @apiParam {String} password Contraseña (min 8 caractares).
* @apiParam {String="Pesos Argentinos (ARS)","Dolares (USD)", "Euros (EUR)"} currency Moneda.
*/
routes.put('/:id', authMidd, (req, res, next) => {
	controller.updateRow(req, res, next)
})

/**
* @apidoc
* @api {delete} /local/users/:id Eliminar un usuario
* @apiVersion 0.1.0
* @APIGroup Users
*/
routes.delete('/:id', authMidd, (req, res, next) => {
	controller.removeRowById(req, res, next)
})

module.exports = routes
