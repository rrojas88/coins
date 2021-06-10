
const { valInput, valPassword } = require('../../../../../utils/utils')

exports.login = ( req ) => {
	let messages = []

	const username = valInput( req.body, 'username', 'string', true )
	if( username != '' ) messages.push( `Usuario: ${username}` )

	const password = valInput( req.body, 'password', 'string', true )
	if( password != '' ) messages.push( `Contraseña: ${password}` )
	
	const validation = ( messages.length == 0 ) ? false : messages
	return validation
}
