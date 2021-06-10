

const success = (res, type, code, data = null) => {
	let message = 'Datos obtenidos correctamente'
	if( type == 'POST' ){
		message = 'Datos creados correctamente'
	}
	else if( type == 'PUT' ){
		message = 'Datos actualizados correctamente'
	}
	else if( type == 'DELETE' ){
		message = 'Datos borrados correctamente'
	}
	let info = { data, message }
	//console.log('SUCCESS: ', info)
	return res.status( code ).json( info )
}

const customizeError = ( res, messages, code ) => {
	return res.status(code).json({ messages })
}

const catchError = ( res, error, funct, code = 500 ) => {
	const dataError = {
		message: '',
		data: '',
		stack: '',
	}
	if( error.hasOwnProperty('message') )
		dataError.message = error.message
	if( error.hasOwnProperty('data') )
		dataError.data = error.data
	if( error.hasOwnProperty('stack') )
		dataError.stack = error.stack
		
	console.log("\n --- catchError."+` ${funct}:`, dataError )
	if( res !== null )
		return res.status(code).json( dataError )
	else
		return dataError
}

const catchMethodError = ( error, funct, code = 500 ) => {
	return catchError( null, error, funct, code )
}

const catchModelError = ( error, funct, code = 500 ) => {
	return catchError( null, error, funct, code )
}

module.exports = {
	success,
	customizeError,
	catchError,
	catchMethodError,
	catchModelError
}

