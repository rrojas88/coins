
const { 
	success, 
	catchError,
	customizeError
} = require('../../../../../utils/responses')
const validation = require('./validations')
const {
	loginValidate,
} = require('../application/methods')

exports.login = async (req, res, next) => {
	try {
		const errors = validation.login( req )
		if( ! errors ){
			const resApp = await loginValidate( req.body )
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
