
const { 
	success, 
	catchError,
	customizeError
} = require('../../../../../utils/responses')
const validation = require('./validations')
const {
	coinById,
	coinCreate
} = require('../application/methods')

exports.getRowByID = async (req, res, next) => {
	try {
		const errors = validation.getRowByID( req )
		if( ! errors ){
			const { id } = req.params
			const resApp = await coinById( id )
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
			const resApp = await coinCreate( req.body )
			return success(res, 'POST', 200, resApp )
		}else{
			return customizeError( res, errors, 500 )
		}
	} catch ( err ) {
		return catchError( res, err, `Controller->createRow()` )
	}
}
