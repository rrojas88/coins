
const bcryptjs = require('bcryptjs')

const { catchMethodError } = require('../../../../../utils/responses')
const userEntity = require('../domain/User')

exports.cryptPassword = async ( pass ) => {
	const salt = await bcryptjs.genSalt(10)
	const password = await bcryptjs.hash(
		pass,
		salt,
	)
	return password
}

exports.usersAll = async () => {
	try {
		const resBd = await userEntity.findAll()
		return resBd
	} catch ( err ) {
		return catchMethodError( err, `Method->usersAll()` )
	}
}

exports.userById = async id => {
	try {
		const resBd = await userEntity.findById( id )
		return resBd
	} catch ( err ) {
		return catchMethodError( err, `Method->userById()` )
	}
}

exports.userCreate = async data => {
	try {
		const resBdExits = await userEntity.findByWhere({
			username: data.username
		})
		if( resBdExits.length != 0 ){
			return {
				error: true,
				errors: 'El nombre de usuario ya está en uso'
			}
		}
		else{
			data.password = await this.cryptPassword( data.password )

			const resBd = await userEntity.save( data )
			return {
				error: false,
				data: resBd
			}
		}		
	} catch ( err ) {
		return catchMethodError( err, `Method->userCreate()` )
	}
}

exports.userUpdate = async (data, id) => {
	try {
		const resBdExits = await userEntity.findByRaw('username =? AND id <> ?', [data.username, id])
		if( resBdExits.length != 0 ){
			return {
				error: true,
				errors: 'El nombre de usuario ya está en uso'
			}
		}
		else{
			if( data.password != '' ){
				data.password = await this.cryptPassword( data.password )
			}

			const resBd = await userEntity.update( data, id )
			return {
				error: false,
				data: resBd
			}
		}
	} catch ( err ) {
		return catchMethodError( err, `Method->userUpdate()` )
	}
}

exports.userRemove = async id => {
	try {
		const resBd = await userEntity.remove( id )
		return resBd
	} catch ( err ) {
		return catchMethodError( err, `Method->userRemove()` )
	}
}
