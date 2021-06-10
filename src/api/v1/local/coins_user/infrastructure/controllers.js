
const { 
	success, 
	catchError,
	customizeError
} = require('../../../../../utils/responses')
const validation = require('./validations')
const utils = require('../../../../../utils/utils')
const {
	getCoinsAllByUserId,
	currentPricesByUserId,
	coinsHistoryByUserAndCoin,
	coinUserCreate
} = require('../application/methods')

exports.getAllRows = async (req, res, next) => {
	try {
		const { id } = req.user
		const user_id = id

		const resApp = await getCoinsAllByUserId( user_id )
		return success(res, 'GET', 200, resApp )
	} catch ( err ) {
		return catchError( res, err, `Controller->getAllRows()` )
	}
}

exports.getCurrentPricesByID = async (req, res, next) => {
	try {
		const { id } = req.user
		const user_id = id
		const currency = utils.getCurrency( req.user.currency )

		const resApp = await currentPricesByUserId( user_id, currency )
		return success(res, 'GET', 200, resApp )
	} catch ( err ) {
		return catchError( res, err, `Controller->getCurrentPricesByID()` )
	}
}

exports.getRowByID = async (req, res, next) => {
	try {
		const errors = validation.getRowByID( req )
		if( ! errors ){
			let order = 'DESC'
			if( req.params.hasOwnProperty('order') && req.params.order != '' ){
				let orderMin = req.params.order.toLowerCase()
				order = ( orderMin == 'desc' || orderMin == 'asc' )? orderMin : order
			}

			const user_id = req.user.id
			const { idcoin } = req.params

			const resApp = await coinsHistoryByUserAndCoin( idcoin, user_id )
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
			const currency = utils.getCurrency( req.user.currency )
			const user_id = req.user.id
			const coins_id = req.body.coins_id.join(',')

			const resApp = await coinUserCreate( coins_id, user_id, currency )
			if( resApp.error )
				return customizeError( res, resApp.messages, 500 )
			else
				return success(res, 'POST', 200, resApp.data )
		}else{
			return customizeError( res, errors, 500 )
		}
	} catch ( err ) {
		return catchError( res, err, `Controller->createRow()` )
	}
}
