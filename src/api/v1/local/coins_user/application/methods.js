
const { catchMethodError } = require('../../../../../utils/responses')

const coinsUserEntity = require('../domain/CoinsUser')
const coinsHistoryEntity = require('../../coins_history/domain/CoinsHistory')
const methodsCoingecko = require('../../../external/coingecko/application/methods')


exports.getCoinsAllByUserId = async ( user_id ) => {
	try {
		const resBd = await coinsUserEntity.findCoinsByUserId( user_id )
		return resBd
	} catch ( err ) {
		return catchMethodError( err, `Method->getCoinsAllByUserId()` )
	}
}

exports.currentPricesByUserId = async ( user_id, currency ) => {
	try {
		// obtengo IDs de las monedas del Usuario
		const coinsBd = await coinsUserEntity.findCoinsByUserId( user_id )
		let i, idcoins = []
		for( i in coinsBd ){
			let coinBd = coinsBd[ i ]
			idcoins.push( coinBd.idcoin )
		}
		const coins_id = idcoins.join(',')

		// API
		const dataCoins = await methodsCoingecko.getDataByCoinIds( coins_id, currency )
		let j
		for( j in dataCoins ){
			let dataCoin = dataCoins[ j ], coin = null, k
			for( k in coinsBd ){
				if( coinsBd[ k ].idcoin == dataCoin.IdCoin )
					coin = coinsBd[ k ]
			}
			
			// Historico
			const dataHistory = {
				coins_user_id: coin.id,
				currency,
				price: dataCoin.Precio,
				last_update: dataCoin['Fecha ultima actualizacion'],
			}
			let respHistory = await coinsHistoryEntity.save(dataHistory)
			delete dataHistory.coins_user_id
			delete dataHistory.last_update
			dataCoins[ j ].Cotizacion = dataHistory
		}
		return dataCoins
	} catch ( err ) {
		return catchMethodError( err, `Method->currentPricesByUserId()` )
	}
}

exports.coinsHistoryByUserAndCoin = async ( idcoin, user_id ) => {
	try {
		const resBd = await coinsUserEntity.findHistoryPricesByUserIdCoin( idcoin, user_id )
		return resBd
	} catch ( err ) {
		return catchMethodError( err, `Method->coinsHistoryByUserAndCoin()` )
	}
}

exports.coinUserCreate = async ( coins_id, user_id, currency ) => {
	try {
		// Limite
		const quantity = await coinsUserEntity.findByWhere({
			user_id,
			removed: 0
		})
		if( quantity.length == 25 ){
			return {
				error: true,
				messages: ['No puedes agregar más monedas']
			}
		}

		// API EXTERNA
		const dataCoins = await methodsCoingecko.getDataByCoinIds( coins_id, currency )

		let i
		for( i in dataCoins ){
			let dataCoin = dataCoins[ i ]
			// Busco si existe en mi BD
			let coinBD = await coinsUserEntity.findByRaw(
				'user_id=? AND idcoin = ?', [ user_id, dataCoin.IdCoin ]
			)
			if( coinBD.length != 0 ){
				let coin = coinBD[ 0 ]

				if( coin.removed == 1 ){// eliminado ?
					coin.removed = 0
					await coinsUserEntity.update( coin, coin.id )
				}

				// Registro en Historial
				const respHistory = await coinsHistoryEntity.save({
					coins_user_id: coin.id,
					currency,
					price: dataCoin.Precio,
					last_update: dataCoin['Fecha ultima actualizacion'],
				})
			}
			else{
				// crear en: coins_user
				const respRowNew = await coinsUserEntity.save({
					user_id,
					idcoin: dataCoin.IdCoin,
					name: dataCoin.Nombre,
					symbol: dataCoin.Simbolo,
					image: dataCoin.Imagen,
				})
				const rowNew = respRowNew[ 0 ]
				// Iniciar Historico
				const respHistory = await coinsHistoryEntity.save({
					coins_user_id: rowNew.id,
					currency,
					price: dataCoin.Precio,
					last_update: dataCoin['Fecha ultima actualizacion'],
				})
			}
		}
		return {
			error: false,
			data: dataCoins
		}
	} catch ( err ) {
		return catchMethodError( err, `Method->coinUserCreate()` )
	}
}
