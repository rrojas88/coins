
const { valInput } = require('../../../../../utils/utils')

exports.getRowByID = ( req ) => {
	let messages = []

	const idcoin = valInput( req.params, 'idcoin', 'string', true )
	if( idcoin != '' ) messages.push( `Id Coin: ${idcoin}` )
	
	const validation = ( messages.length == 0 ) ? false : messages
	return validation
}

exports.createRow = ( req ) => {
	let messages = []

	const coins_id = valInput( req.body, 'coins_id', 'array', true )
	if( coins_id != '' ) messages.push( `Monedas Id: ${coins_id}` )
	
	const validation = ( messages.length == 0 ) ? false : messages
	return validation
}
