'use strict'
const Knex = require('knex')
const config = require('../config')

const createInstanceConnection = () => {
	this.manager = Knex({
		...config.connectionBD,
	})
}

const getInstance = () => {
	if( ! this.manager ){
		createInstanceConnection()
	}
	return this.manager
}

module.exports = {
	getInstance
}
