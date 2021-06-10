define({ "api": [
  {
    "type": "get",
    "url": "/external/coingecko/get-available-coins",
    "title": "Consultar todas la monedas disponibles (Orden por default: desc)",
    "version": "0.1.0",
    "group": "API_Externa",
    "filename": "src/api/v1/external/coingecko/routes.js",
    "groupTitle": "API_Externa",
    "name": "GetExternalCoingeckoGetAvailableCoins"
  },
  {
    "type": "get",
    "url": "/external/coingecko/get-available-coins/:order",
    "title": "Consultar todas la monedas disponibles (En un \"Orden\" dado)",
    "version": "0.1.0",
    "group": "API_Externa",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"asc\"",
              "\"desc\""
            ],
            "optional": false,
            "field": "order",
            "description": "<p>Orden para mostrar.</p>"
          }
        ]
      }
    },
    "filename": "src/api/v1/external/coingecko/routes.js",
    "groupTitle": "API_Externa",
    "name": "GetExternalCoingeckoGetAvailableCoinsOrder"
  },
  {
    "type": "get",
    "url": "/external/coingecko/get-available-coins/:order/page/:page",
    "title": "Consultar todas la monedas disponibles (En un \"Orden\" y una \"Pagina\" dada)",
    "version": "0.1.0",
    "group": "API_Externa",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"asc\"",
              "\"desc\""
            ],
            "optional": false,
            "field": "order",
            "description": "<p>Orden para mostrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Página a mostrar.</p>"
          }
        ]
      }
    },
    "filename": "src/api/v1/external/coingecko/routes.js",
    "groupTitle": "API_Externa",
    "name": "GetExternalCoingeckoGetAvailableCoinsOrderPagePage"
  },
  {
    "type": "post",
    "url": "/external/coingecko/get-data-by-ids-coin",
    "title": "Consultar la información de una o varias monedas por sus IDs (Identificadores de monedas separados por comas, ejemplo: \"ripple,bitcoin\")",
    "version": "0.1.0",
    "group": "API_Externa",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "coins_id",
            "description": "<p>IDs (identificadores, ejemplo: [&quot;ripple&quot;]) de las monedas a consultarse.</p>"
          }
        ]
      }
    },
    "filename": "src/api/v1/external/coingecko/routes.js",
    "groupTitle": "API_Externa",
    "name": "PostExternalCoingeckoGetDataByIdsCoin"
  },
  {
    "type": "post",
    "url": "/local/auth/login",
    "title": "Permite generar un token para la autenticación",
    "version": "0.1.0",
    "group": "Autenticación",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nombre de usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contraseña.</p>"
          }
        ]
      }
    },
    "filename": "src/api/v1/local/auth/routes.js",
    "groupTitle": "Autenticación",
    "name": "PostLocalAuthLogin"
  },
  {
    "type": "get",
    "url": "/local/coins-user/get-history-by-coin-id/:idcoin",
    "title": "Consultar el Historico de precios de una moneda de un usuario",
    "version": "0.1.0",
    "group": "CoinsUser",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "idcoin",
            "description": "<p>ID (String del identificador, ejemplo: &quot;ripple&quot; ) de la moneda a consultarse.</p>"
          }
        ]
      }
    },
    "filename": "src/api/v1/local/coins_user/routes.js",
    "groupTitle": "CoinsUser",
    "name": "GetLocalCoinsUserGetHistoryByCoinIdIdcoin"
  },
  {
    "type": "get",
    "url": "/local/coins-user/get-prices-user-coins",
    "title": "Consultar el precio actual de todas las monedas de un usuario y los actualiza en la BD",
    "version": "0.1.0",
    "group": "CoinsUser",
    "filename": "src/api/v1/local/coins_user/routes.js",
    "groupTitle": "CoinsUser",
    "name": "GetLocalCoinsUserGetPricesUserCoins"
  },
  {
    "type": "get",
    "url": "/local/coins-user/get-user-coins",
    "title": "Listar las monedas asociadas a un usuario (No actualiza la BD)",
    "version": "0.1.0",
    "group": "CoinsUser",
    "filename": "src/api/v1/local/coins_user/routes.js",
    "groupTitle": "CoinsUser",
    "name": "GetLocalCoinsUserGetUserCoins"
  },
  {
    "type": "post",
    "url": "/local/coins-user",
    "title": "Permite a un usuario agregarse una o varias monedas por medio del \"IdCoin\"",
    "version": "0.1.0",
    "group": "CoinsUser",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "coins_id",
            "description": "<p>IDs (Array con String de los identificadores, ejemplo: [&quot;ripple&quot;]) de las monedas a agregarse.</p>"
          }
        ]
      }
    },
    "filename": "src/api/v1/local/coins_user/routes.js",
    "groupTitle": "CoinsUser",
    "name": "PostLocalCoinsUser"
  },
  {
    "type": "delete",
    "url": "/local/users/:id",
    "title": "Eliminar un usuario",
    "version": "0.1.0",
    "group": "Users",
    "filename": "src/api/v1/local/users/routes.js",
    "groupTitle": "Users",
    "name": "DeleteLocalUsersId"
  },
  {
    "type": "get",
    "url": "/local/users",
    "title": "Obtener todos los usuarios",
    "version": "0.1.0",
    "group": "Users",
    "filename": "src/api/v1/local/users/routes.js",
    "groupTitle": "Users",
    "name": "GetLocalUsers"
  },
  {
    "type": "get",
    "url": "/local/users/by-id/:id",
    "title": "Obtener un usuario por su Id",
    "version": "0.1.0",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador del usuario.</p>"
          }
        ]
      }
    },
    "filename": "src/api/v1/local/users/routes.js",
    "groupTitle": "Users",
    "name": "GetLocalUsersByIdId"
  },
  {
    "type": "post",
    "url": "/local/users",
    "title": "Crear un usuario",
    "version": "0.1.0",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "names",
            "description": "<p>Nombres.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "surnames",
            "description": "<p>Apellidos.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nombre de usuario (Nickname).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contraseña (min 8 caractares).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"Pesos Argentinos (ARS)\"",
              "\"Dolares (USD)\"",
              "\"Euros (EUR)\""
            ],
            "optional": false,
            "field": "currency",
            "description": "<p>Moneda.</p>"
          }
        ]
      }
    },
    "filename": "src/api/v1/local/users/routes.js",
    "groupTitle": "Users",
    "name": "PostLocalUsers"
  },
  {
    "type": "put",
    "url": "/local/users/:id",
    "title": "Editar un usuario",
    "version": "0.1.0",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "names",
            "description": "<p>Nombres.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "surnames",
            "description": "<p>Apellidos.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nombre de usuario (Nickname).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contraseña (min 8 caractares).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"Pesos Argentinos (ARS)\"",
              "\"Dolares (USD)\"",
              "\"Euros (EUR)\""
            ],
            "optional": false,
            "field": "currency",
            "description": "<p>Moneda.</p>"
          }
        ]
      }
    },
    "filename": "src/api/v1/local/users/routes.js",
    "groupTitle": "Users",
    "name": "PutLocalUsersId"
  }
] });
