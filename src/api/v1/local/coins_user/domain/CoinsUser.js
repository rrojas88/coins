
const { catchModelError } = require('../../../../../utils/responses')
const { getNowDate } = require('../../../../../utils/utils')
const bd = require('../../../../../config/data/bd')

const coinsHistoryEntity = require('../../coins_history/domain/CoinsHistory')

const connect = bd.getInstance()

const entity = 'coins_user'

/*
*  Consulta de las Monedas que tiene un Usuario (No precios)
*/
exports.findCoinsByUserId = async ( user_id ) => {
	try {
		const resQuery = await connect.from(`${entity}`)
			.where({ 
				user_id,
				removed: 0,
			})
        return resQuery
    } catch ( err ) {
        return catchModelError( err, `${entity}->findCoinsByUserId()` )
	}
}

/*
Método que consulta el Historico de precios de la moneda de un Usuario
*/
exports.findHistoryPricesByUserIdCoin = async ( idcoin, user_id ) => {
	try {
		let dataCoin = {}
		const resQuery = await connect.from(`${entity} AS c`)
			.select(
				'c.id',
				'c.idcoin AS IdCoin',
				'c.symbol AS Simbolo',
				'c.name AS Nombre',
				'c.image AS Imagen',
			)
			.where({
				'c.user_id': user_id,
				'c.idcoin': idcoin,
				'c.removed': 0,
			})

		if( resQuery.length != 0 ){
			dataCoin = resQuery[ 0 ]
			dataCoin.Cotizaciones = await coinsHistoryEntity.findAllByCoinsUserId( dataCoin.id )
		}
        return dataCoin
    } catch ( err ) {
        return catchModelError( err, `${entity}->findHistoryPricesByUserIdCoin()` )
	}
}

exports.findByWhere = async where => {
	try {
		const resQuery = await connect.from(`${entity}`)
			.where(where)
        return resQuery
    } catch ( err ) {
        return catchModelError( err, `${entity}->findByWhere()` )
	}
}

exports.findByRaw = async ( sql, params ) => {
	try {
		const resQuery = await connect.from(`${entity}`)
			.whereRaw(sql, params)
        return resQuery
    } catch ( err ) {
        return catchModelError( err, `${entity}->findByRaw()` )
	}
}

exports.save = async data => {
	try {
		const entityData = {
			user_id: data.user_id,
			idcoin: data.idcoin,
			name: data.name,
			symbol: data.symbol,
			image: data.image,
		}
		const resQuery = await connect(`${entity}`).insert(entityData)
		const resFind = await this.findByWhere(entityData)
		return resFind
	} catch ( err ) {
		return catchModelError( err, `${entity}->save()` )
	}
}

exports.update = async (data, id) => {
	try {
		const entityData = {
			user_id: data.user_id,
			idcoin: data.idcoin,
			name: data.name,
			symbol: data.symbol,
			image: data.image,
		}
		const resQuery = await connect(`${entity}`)
			.update(entityData).where('id', id)
		entityData.id = id
		return entityData
	} catch ( err ) {
		return catchModelError( err, `${entity}->update()` )
	}
}
