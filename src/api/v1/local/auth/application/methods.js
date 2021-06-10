
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { catchMethodError } = require('../../../../../utils/responses')
const userEntity = require('../../users/domain/User')

exports.loginValidate = async data => {
	try {
		const resBdUserExist = await userEntity.findByWhere({
			username: data.username
		})
		if( resBdUserExist.length == 0 ){
			return {
				error: true,
				errors: 'El usuario no existe'
			}
		}
		else{
			const user = resBdUserExist[ 0 ]
			const dataToken = {
				user: {
					id: user.id,
					username: user.username,
					currency: user.currency,
				}
			}
			const token = await jwt.sign(dataToken, process.env.SECRET_KEY, {
				expiresIn: 14400, // 4 hours
			})

			return {
				error: false,
				data: token
			}
		}		
	} catch ( err ) {
		return catchMethodError( err, `Method->userCreate()`, 500 )
	}
}
