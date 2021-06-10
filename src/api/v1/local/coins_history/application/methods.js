
const { catchMethodError } = require('../../../../../utils/responses')
const coinsHistoryEntity = require('../domain/CoinsHistory')

exports.coinById = async id => {
	try {
		const resBd = await coinsHistoryEntity.findById( id )
		return resBd
	} catch ( err ) {
		return catchMethodError( err, `Method->coinById()` )
	}
}

exports.coinCreate = async data => {
	try {
		const resBd = await coinsHistoryEntity.save( data )
		return resBd
	} catch ( err ) {
		return catchMethodError( err, `Method->coinCreate()` )
	}
}
