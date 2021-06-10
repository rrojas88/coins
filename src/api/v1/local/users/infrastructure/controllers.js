
const { 
	success, 
	catchError,
	customizeError
} = require('../../../../../utils/responses')
const validation = require('./validations')
const {
	usersAll,
	userById,
	userCreate,
	userUpdate,
	userRemove
} = require('../application/methods')

exports.getAllRows = async (req, res, next) => {
	try {
		const resApp = await usersAll()
		return success(res, 'GET', 200, resApp )
	} catch ( err ) {
		return catchError( res, err, `Controller->getAllRows()` )
	}
}

exports.getRowByID = async (req, res, next) => {
	try {
		const errors = validation.getRowByID( req )
		if( ! errors ){
			const { id } = req.params
			const resApp = await userById( id )
			return success(res, 'GET', 200, resApp )
		}else{
			return customizeError( res, errors, 500 )
		}
	} catch ( err ) {
		return catchError( res, err, `Controller->getRowByID()` )
	}
}

exports.createRow = async (req, res, next) => {
	try {
		const errors = validation.createRow( req )
		if( ! errors ){
			const resApp = await userCreate( req.body )
			if( ! resApp.error )
				return success(res, 'POST', 200, resApp.data )
			else
				return customizeError( res, resApp.errors, 500 )
		}else{
			return customizeError( res, errors, 500 )
		}
	} catch ( err ) {
		return catchError( res, err, `Controller->createRow()` )
	}
}

exports.updateRow = async (req, res, next) => {
	try {
		const errors = validation.updateRow( req )
		if( ! errors ){
			const { id } = req.params
			const resApp = await userUpdate( req.body, id )
			if( ! resApp.error )
				return success(res, 'PUT', 200, resApp.data )
			else
				return customizeError( res, resApp.errors, 500 )
		}else{
			return customizeError( res, errors, 500 )
		}
	} catch ( err ) {
		return catchError( res, err, `Controller->updateRow()` )
	}
}

exports.removeRowById = async (req, res, next) => {
	try {
		const errors = validation.removeRowById( req )
		if( ! errors ){
			const { id } = req.params
			const resApp = await userRemove( id )
			return success(res, 'DELETE', 200, resApp )
		}else{
			return customizeError( res, errors, 500 )
		}
	} catch ( err ) {
		return catchError( res, err, `Controller->removeRowById()` )
	}
}
