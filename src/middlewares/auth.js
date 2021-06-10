
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	const auth = req.header('Authorization')
	if( ! auth ){
		return res.status(403).json({ message: 'Acceso denegado' })
	}
	let token = auth.slice(7, auth.length)
	try {
		const hash = jwt.verify( token, process.env.SECRET_KEY )
		req.user = hash.user
		next()
	} catch (error) {
		res.status(401).json({ message: 'Token inválido' })
	}
}
