
require('dotenv').config()

const enviroment = process.env.NODE_ENV

const configurations = {
    development: {
        port: process.env.PORT_DEV,
		URL_COINS: process.env.URL_COINS_DEV,
		connectionBD: {
			client: 'mysql',
			connection: process.env.CONNECTION_DEV,
			pool: {
				destroy: client => client.end(),
				max: 180,
				min: 2,
				idleTimeoutMillis: 30000,
				log: true,
			},
			debug: false,
			acquireConnectionTimeout: 10000,
		}
    },
    production: {
        port: process.env.PORT_PRO,
		URL_COINS: process.env.URL_COINS_PROD,
		connectionBD: {
			client: 'mysql',
			//connection: process.env.CONNECTION_PRO, 
			connection: process.env.CONNECTION_DEV,
			attach: 'onPreHandler',
			detach: 'tail',
			searchPath: 'public',
			pool: {
				destroy: client => client.end(),
				max: 180,
				min: 2,
				idleTimeoutMillis: 30000,
				log: true,
			},
			debug: false,
			acquireConnectionTimeout: 10000
		}
    }
}
const config = configurations[ enviroment ]

module.exports = config
