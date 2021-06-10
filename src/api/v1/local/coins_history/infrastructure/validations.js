
const { valInput } = require('../../../../../utils/utils')

exports.getRowByID = ( req ) => {
	let messages = []

	const id = valInput( req.params, 'id', 'number', true )
	if( id != '' ) messages.push( `Id: ${id}` )
	
	const validation = ( messages.length == 0 ) ? false : messages
	return validation
}

exports.createRow = ( req ) => {
	let messages = []

	const coins_user_id = valInput( req.body, 'coins_user_id', 'number', true )
	if( coins_user_id != '' ) messages.push( `Usuario Id: ${coins_user_id}` )

	const currency = valInput( req.body, 'currency', 'string', true )
	if( currency != '' ) messages.push( `Moneda: ${currency}` )

	const price = valInput( req.body, 'price', 'number', true )
	if( price != '' ) messages.push( `Precio: ${price}` )
	
	const last_update = valInput( req.body, 'last_update', 'string', false )
	if( last_update != '' ) messages.push( `Fecha Actualización}: ${last_update}` )
	
	const validation = ( messages.length == 0 ) ? false : messages
	return validation
}
