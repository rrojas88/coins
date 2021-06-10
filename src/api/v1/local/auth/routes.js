
const express = require('express')

const controller = require('./infrastructure/controllers')

const routes = express.Router()

/**
* @apidoc
* @api {post} /local/auth/login Permite generar un token para la autenticación
* @apiVersion 0.1.0
* @APIGroup Autenticación
* @apiParam {String} username Nombre de usuario.
* @apiParam {String} password Contraseña.
*/
routes.post('/login', function (req, res, next) {
	controller.login(req, res, next)
})

module.exports = routes
