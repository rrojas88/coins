
const request = require('supertest')

const app = require('../index')

/*
* Crear el usuario Inicial de Pruebas
* Se puede modificar el USERNAME y PASSWORD para obtener el TOKEN para posteriores pruebas sobre el API
*/
const dataUser = {
	id: null,
	username: 'ssssssss',
	password: '1234567a'
}

describe("**** *** ** Crear Usuario inicial para pruebas: \nUsername: "+dataUser.username+"\nContraseña: "+dataUser.password+"\n", () => {
	it(' ==> Crear usuarios inicial:  Debe responder con código 200', done => {
		request( app )
			.post('/v1/local/users')
			.send({
				"names": "Pepito",
				"surnames": "Perez",
				"username": dataUser.username,
				"password": dataUser.password,
				"currency": "Dolares (USD)"
			})
			.set('Accept', 'application/json')
			.expect( 200 )
			.end(( err, res ) => {
				if( err ) return done(err)
				dataUser.id = res.body.data.id
				//console.log(" ===> Login OK. \n Tomar el token si se desea realizar pruebas manuales: \n", token + "\n")
				done()
			})
	})
})
//dataUser.id = 21

let token = ''
describe('**** *** ** Pruebas del componente: Users', function() {

	/*
	* Obtener Token desde el Login
	*/
	before( ( done ) => {
		request(app)
			.post('/v1/local/auth/login')
			.send(dataUser)
			.end(( err, res ) => {
				if( err ) return done(err)
				token = res.body.data
				
				done()
			})
	})

	/*
	* Test: Consultar usuarios
	*/
	it(' ==> Consultar usuarios: Debe responder con código 200', done => {
		request( app )
			.get('/v1/local/users')
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + token)
			.expect( 200 )
			.end(( err, res ) => {
				if( err ) return done(err)
				done()
			})
	})

	/*
	* Test: Actualizar un usuario
	*/
	it(' ==> Actualizar usuario: Debe responder con código 200', done => {
		if( dataUser.id === null ) dataUser.id = 1
		request( app )
			.put( '/v1/local/users/' + dataUser.id )
			.send({
				"names": "Pepito",
				"surnames": "Perez",
				"username": dataUser.username,
				"password": dataUser.password,
				"currency": "Pesos Argentinos (ARS)"
			})
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + token)
			.expect( 200, done )
	})

	/*
	* Test: Consultar un usuario
	*/
	it(' ==> Consultar usuario: Debe responder con código 200', done => {
		request( app )
			.get( '/v1/local/users/by-id/' + dataUser.id )
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + token)
			.expect( 200, done )
	})
})

describe('**** *** ** Pruebas del componente: UsersCoins', function() {

	/*
	* Test: Adicionar monedas a usuario
	*/
	it(' ==> Adicionarme monedas: Debe responder con código 200', done => {
		request( app )
			.post( '/v1/local/coins-user' )
			.send({
				"coins_id": [ "ripple", "dogecoin" ]
			})
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + token)
			.expect( 200, done )
	})

	/*
	* Test: Obtener las monedas que sigue un usuario (Sin actualizar la BD)
	*/
	it(' ==> Obtener monedas del usuario: Debe responder con código 200', done => {
		request( app )
			.get( '/v1/local/coins-user/get-user-coins' )
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + token)
			.expect( 200, done )
	})

	/*
	* Test: Obtener el Historico de una moneda que sigue un usuario
	*/
	it(' ==> Obtener historico de una moneda del usuario: Debe responder con código 200', done => {
		request( app )
			.get( '/v1/local/coins-user/get-history-by-coin-id/ripple' )
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + token)
			.expect( 200, done )
	})

	/*
	* Test: Obtener el precio actual de las monedas que sigue un usuario, y se agrega en a la BD (Historico)
	*/
	it(' ==> Obtener precios actuales de monedas del usuario: Debe responder con código 200', done => {
		request( app )
			.get( '/v1/local/coins-user/get-prices-user-coins' )
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + token)
			.expect( 200, done )
	})
})

describe('**** *** ** Pruebas del componente: Coingecko', function() {

	/*
	* Test: Obtener todas la monedas disponibles (Orden DESC por default)
	*/
	it(' ==> Obtener monedas disponibles: Debe responder con código 200', done => {
		request( app )
			.get( '/v1/external/coingecko/get-available-coins' )
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + token)
			.expect( 200, done )
	})

	/*
	* Test: Obtener todas la monedas disponibles en un orden dado
	*/
	it(' ==> Obtener monedas disponibles en un orden dado: Debe responder con código 200', done => {
		request( app )
			.get( '/v1/external/coingecko/get-available-coins/asc' )
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + token)
			.expect( 200, done )
	})

	/*
	* Test: Obtener todas la monedas disponibles en un orden y pagina dadas
	*/
	it(' ==> Obtener monedas disponibles en un orden y pagina: Debe responder con código 200', done => {
		request( app )
			.get( '/v1/external/coingecko/get-available-coins/desc/page/2' )
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + token)
			.expect( 200, done )
	})

	/*
	* Test: Obtener la informacion de una o varias monedas
	*/
	it(' ==> Obtener informacion del mercado de una o varias monedas: Debe responder con código 200', done => {
		request( app )
			.post( '/v1/external/coingecko/get-data-by-ids-coin' )
			.send({
				"coins_id": [ "ripple" ]
			})
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + token)
			.expect( 200 )
			.end(( err, res ) => {
				setTimeout( ()=>{
					console.log("Tomar el TOKEN si se desea realizar pruebas manuales: \n\n", token + "\n"+
					"\nSi 'Crear usuario inicial' ha fallado, posiblemente falle el 'Actualizar usuario' porque no encuentra su ID... esto se debe a que el 'username' ya existe. \nCambielo en la ruta 'src/tests/api.test.js' (línea 12) e intente de nuevo.\n\n"
					)
				}, 1500)
				if( err ) return done(err)
				done()
			})
	})
})