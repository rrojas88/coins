
const { 
	success, 
	catchError,
	customizeError
} = require('../../../../../utils/responses')
const validation = require('./validations')
const utils = require('../../../../../utils/utils')
const {
	coinsAll,
	getDataByCoinIds
} = require('../application/methods')

exports.getAllRows = async (req, res, next) => {
	try {
		const params = req.params
		let orderTmp = 'DESC'
		if( params.hasOwnProperty('order') && params.order != '' ){
			let orderMin = params.order.toUpperCase()
			orderTmp = ( orderMin == 'DESC' || orderMin == 'ASC' )? orderMin : orderTmp
		}
		const order = utils.getOrder( orderTmp )

		let page = 1
		if( params.hasOwnProperty('page') && params.page != ''  && 
			params.page !== null  && ! isNaN(params.page) ){
			page = params.page
		}

		const currency = utils.getCurrency( req.user.currency )

		const resApp = await coinsAll( currency, order, page )
		return success(res, 'GET', 200, resApp )
	} catch ( err ) {
		return catchError( res, err, `Controller->getAllRows()` )
	}
}

exports.getDataCoinByIds = async (req, res, next) => {
	try {
		const currency = utils.getCurrency( req.user.currency )

		const errors = validation.getDataCoinByIds( req )
		if( ! errors ){
			const coins_id = req.body.coins_id.join(',')
			const resApp = await getDataByCoinIds( coins_id, currency )
			return success(res, 'GET', 200, resApp )
		}else{
			return customizeError( res, errors, 500 )
		}
	} catch ( err ) {
		return catchError( res, err, `Controller->getDataCoinByIds()` )
	}
}
