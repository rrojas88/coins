

const { catchModelError } = require('../../../../../utils/responses')
const { getNowDate } = require('../../../../../utils/utils')
const bd = require('../../../../../config/data/bd')
const connect = bd.getInstance()

const entity = 'coins_history'

exports.findAllByCoinsUserId = async ( coins_user_id ) => {
	try {
		const resQuery = await connect.from(`${entity}`)
			.select(
				'id',
				'currency AS Moneda',
				'price AS Precio',
				connect.raw("DATE_FORMAT(last_update, '%Y-%m-%d %H:%i:%s') AS FechaUltimaActualizacion"),
			)
			.where({ coins_user_id })
        return resQuery
    } catch ( err ) {
        return catchModelError( err, `${entity}->findAllByCoinsUserId()` )
	}
}

exports.findById = async id => {
	try {
		const resQuery = await connect.from(`${entity}`)
			.where({ id })
			.first()
        return resQuery
    } catch ( err ) {
        return catchModelError( err, `${entity}->findById()` )
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

exports.save = async data => {
	try {
		const entityData = {
			coins_user_id: data.coins_user_id,
			currency: data.currency,
			price: data.price,
			last_update: data.last_update,
		}
		const resQuery = await connect(`${entity}`).insert(entityData)
		const resFind = await this.findByWhere(entityData)
		return resFind
	} catch ( err ) {
		return catchModelError( err, `${entity}->save()` )
	}
}
