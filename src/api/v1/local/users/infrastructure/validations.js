
const { valInput, valPassword } = require('../../../../../utils/utils')

exports.getRowByID = ( req ) => {
	let messages = []

	const id = valInput( req.params, 'id', 'number', true )
	if( id != '' ) messages.push( `Id: ${id}` )
	
	const validation = ( messages.length == 0 ) ? false : messages
	return validation
}

exports.createRow = ( req ) => {
	let messages = []

	const names = valInput( req.body, 'names', 'string', true )
	if( names != '' ) messages.push( `Nombres: ${names}` )
	
	const surnames = valInput( req.body, 'surnames', 'string', false )
	if( surnames != '' ) messages.push( `Apellidos: ${surnames}` )

	const username = valInput( req.body, 'username', 'string', true )
	if( username != '' ) messages.push( `Usuario: ${username}` )

	const currency = valInput( req.body, 'currency', 'string', false )
	if( currency != '' ) messages.push( `Moneda: ${currency}` )

	const password = valInput( req.body, 'password', 'string', true )
	if( password != '' ) messages.push( `Contraseña: ${password}` )

	const passValidate = valPassword( req.body.password )
	if( passValidate != '' ) messages.push( `Contraseña: ${passValidate}` )
	
	const validation = ( messages.length == 0 ) ? false : messages
	return validation
}

exports.updateRow = ( req ) => {
	let messages = []

	const id = valInput( req.params, 'id', 'number', true )
	if( id != '' ) messages.push( `Id: ${id}` )

	const names = valInput( req.body, 'names', 'string', true )
	if( names != '' ) messages.push( `Nombres: ${names}` )
	
	const surnames = valInput( req.body, 'surnames', 'string', false )
	if( surnames != '' ) messages.push( `Apellidos: ${surnames}` )

	const username = valInput( req.body, 'username', 'string', true )
	if( username != '' ) messages.push( `Usuario: ${username}` )

	const currency = valInput( req.body, 'currency', 'string', false )
	if( currency != '' ) messages.push( `Moneda: ${currency}` )

	const password = valInput( req.body, 'password', 'string', false )
	if( password != '' ) messages.push( `Contraseña: ${password}` )
	
	const validation = ( messages.length == 0 ) ? false : messages
	return validation
}

exports.removeRowById = ( req ) => {
	let messages = []

	const id = valInput( req.params, 'id', 'number', true )
	if( id != '' ) messages.push( `Id: ${id}` )
	
	const validation = ( messages.length == 0 ) ? false : messages
	return validation
}
