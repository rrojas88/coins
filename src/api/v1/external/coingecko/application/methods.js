
const axios = require('axios')

const { catchMethodError } = require('../../../../../utils/responses')
const { URL_COINS } = require('../../../../../config/config')

const customizeData = async ( listCoins ) => {
	let i
	for( i in listCoins ){
		let coin = listCoins[ i ]
		coinRow = {
			'IdCoin': coin.id,
			'Simbolo': coin.symbol,
			'Precio': coin.current_price,
			'Nombre': coin.name,
			'Imagen': coin.image,
			'Fecha ultima actualizacion': coin.last_updated,
		}
		listCoins[ i ] = coinRow
	}
	return listCoins
}

exports.coinsAll = async ( currency, order, page ) => {
	try {
		const BASE_URL = `${URL_COINS}/coins/markets`
		const params = `?vs_currency=${currency}&order=${order}&per_page=150&page=${page}&sparkline=false`
		const url = BASE_URL + params

		const { data } = await axios.get( url )
		const listCoins = await customizeData( data )
		return listCoins
	} catch ( err ) {
		return catchMethodError( err, `Method->coinsAll()` )
	}
}

exports.getDataByCoinIds = async (  coins_id, currency  ) => {
	try {
		const BASE_URL = `${URL_COINS}/coins/markets`
		const params = `?vs_currency=${currency}&ids=${coins_id}&order=market_cap_desc&per_page=150&page=1&sparkline=false`
		const url = BASE_URL + params
		const { data } = await axios.get( url )
		const listCoins = await customizeData( data )
		return listCoins
	} catch ( err ) {
		return catchMethodError( err, `Method->getDataByCoinIds()` )
	}
}
