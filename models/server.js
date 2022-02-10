// Servidor de Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');

const Sockets = require("./sockets");
const { dbConnection } = require("../config/database");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Conectar a DB
    dbConnection();

    // Http server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    this.io = socketio(this.server, {
      /* configuraciones */
    });
  }

  middlewares() {
    // Documentacion de la API
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    // CORS
    this.app.use(cors());

    this.app.use(logger("dev"));

    // Parseo del body
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());

  }

  // Esta configuración se puede tener aquí o como propieda de clase
  // depende mucho de lo que necesites
  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();

    // Inicializar sockets
    this.configurarSockets();

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto:", this.port);
    });
  }
}

module.exports = Server;
