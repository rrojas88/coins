
const { valInput } = require('../../../../../utils/utils')

exports.getDataCoinByIds = ( req ) => {
	let messages = []

	const coins_id = valInput( req.body, 'coins_id', 'array', true )
	if( coins_id != '' ) messages.push( `Monedas Id: ${coins_id}` )
	
	const validation = ( messages.length == 0 ) ? false : messages
	return validation
}
