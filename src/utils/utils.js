
const valInput = ( data, input, type, required = false ) => {
	if( ! data.hasOwnProperty(input) ){
		return 'El campo es requerido'
	}
	else{
		const value = (type == 'number')? + data[input] : data[input]

		if( required && ( value === null || value == '' )
		){
			return 'El valor del campo es obligatorio'
		}
		else if( ! required && ( value === undefined || value === null )
		){
			return 'El campo es obligatorio'
		}
		else if( type == 'number' && isNaN( value )){
			return 'El valor debe ser númerico'
		}
		else if( type == 'boolean' && typeof(value) != 'boolean' ){
			return 'El valor es inválido'
		}
		else if( type == 'array' ){
			if( typeof(value) != 'object' ){
				return 'Debe ser un Array de datos'
			}
			else if( value.length == 0 ){
				return 'Debe ser un Array con datos'
			}
			else {
				return ''
			}
		}
		else{
			return ''
		}
	}
}

const valPassword = pass => {
	if( ! /(\d)+/.test( pass ) ){
		return 'Debe tener al menos un número'
	}
	if( ! /[a-zA-Z]+/.test( pass ) ){
		return 'Debe tener al menos una letra'
	}
	if( pass.length < 8 ){
		return 'Debe tener mínimo 8 caracteres'
	}
	return ''
}

const getNowDate = () => {
	const dateCol = new Date().toLocaleString('es-AR', {
		timeZone: 'America/Argentina/Buenos_Aires',
	})
	let dateDMAAAA, vDateCol, timeOnly, apm
	if (dateCol.indexOf(',') !== -1) {
		vDateCol = dateCol.split(',')
		dateDMAAAA = vDateCol[0]
		const timeAmPm = vDateCol[1]
		const vTimeAmPm = timeAmPm.trim().split(' ')
		timeOnly = vTimeAmPm[0]
	} else {
		vDateCol = dateCol.split(' ')
		dateDMAAAA = vDateCol[0]
		timeOnly = vDateCol[1]
	}
	let vDateDMAAAA, d, dd, m, mm, aaaa
	if (dateDMAAAA.indexOf('/') !== -1) {
		vDateDMAAAA = dateDMAAAA.split('/')
		d = +vDateDMAAAA[0]
		dd = d < 10 ? `0${d}` : d
		m = +vDateDMAAAA[1]
		mm = m < 10 ? `0${m}` : m
		aaaa = vDateDMAAAA[2]
	} else {
		vDateDMAAAA = dateDMAAAA.split('-')
		d = +vDateDMAAAA[2]
		dd = d < 10 ? `0${d}` : d
		m = +vDateDMAAAA[1]
		mm = m < 10 ? `0${m}` : m
		aaaa = vDateDMAAAA[0]
	}
	let dateTime = `${aaaa}-${mm}-${dd} ${timeOnly}`
	let date = `${aaaa}-${mm}-${dd}`
	let time = `${timeOnly}`

	return {
		dateTime,
		date,
		time,
	}
}

const getOrder = ( order ) => {
	const orders = {
		'DESC': 'market_cap_desc',
		'ASC': 'market_cap_asc',
	}
	const ord = ( orders[ order ] !== undefined ) ? orders[ order ] : 'market_cap_desc'
	return ord
}

const getCurrency = ( currency ) => {
	const currencies = {
		'Pesos Argentinos (ARS)': 'ars',
		'Dolares (USD)': 'usd',
		'Euros (EUR)': 'eur',
	}
	const curr = ( currencies[ currency ]!== undefined )? currencies[ currency ] : 'usd'
	return curr
}

module.exports = {
	valInput,
	valPassword,
	getNowDate,
	getOrder,
	getCurrency
}
