
const { catchModelError } = require('../../../../../utils/responses')
const bd = require('../../../../../config/data/bd')
const connect = bd.getInstance()

const entity = 'users'

exports.findAll = async () => {
	try {
		const resQuery = await connect.from(`${entity}`)
			.select(
				'id',
				'names',
				'username',
				'username',
				'currency',
			)
			.where({ removed: 0 })
        return resQuery
    } catch ( err ) {
        return catchModelError( err, `${entity}->findAll()` )
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
			names: data.names,
			surnames: data.surnames,
			username: data.username,
			password: data.password,
			currency: data.currency,
		}
		const resQuery = await connect(`${entity}`).insert(entityData)
		const resFind = await this.findByWhere(entityData)
		return resFind[ 0 ]
	} catch ( err ) {
		return catchModelError( err, `${entity}->save()` )
	}
}

exports.update = async (data, id) => {
	try {
		const entityData = {
			names: data.names,
			surnames: data.surnames,
			username: data.username,
			password: data.password,
			currency: data.currency,
		}
		if( data.password == '' ) delete entityData.password
		const resQuery = await connect(`${entity}`)
			.update(entityData).where('id', id)
		entityData.id = id
		return entityData
	} catch ( err ) {
		return catchModelError( err, `${entity}->update()` )
	}
}

exports.remove = async id => {
	try {
		const resQuery = await connect(`${entity}`)
			.update({ removed: 1 }).where('id', id)
		return resQuery
	} catch ( err ) {
		return catchModelError( err, `${entity}->remove()` )
	}
}
