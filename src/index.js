
const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config/config')
const routes = require('./api/v1/routes')

const app = express()

app.use( express.urlencoded({ extended: false }) )
app.use( express.json() )
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "*")
	res.header(
	  "Access-Control-Allow-Headers",
	  "Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use('/v1', routes)


app.listen( config.port, () => {
    console.log(`El servidor está inicializado en el puerto ${config.port}` )
});

module.exports = app
