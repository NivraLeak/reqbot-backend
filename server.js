// 1. Import dependencies
const express = require("express");
const app = express();
require("dotenv").config();

// 1.1 Allow parsing on request bodies
app.use(express.json());

// 2. Import routes for api

const historiaUsuarioRoutes = require('./src/components/historiausuario/api/historiausuario.api');
//const logsRoutes = require('./src/components/logs/api/logs.api');
const organizacionRoutes = require('./src/components/organizacion/api/organizacion.api');
const planRoutes = require('./src/components/plan/api/plan.api');
const proyectoRoutes = require("./src/components/proyecto/api/proyecto.api");
const ticketRoutes = require("./src/components/ticket/api/ticket.api");
const usuarioRoutes = require("./src/components/usuario/api/usuario.api");
const watsonRoutes = require("./src/components/watson/api/watson");
const usuarioProyectoRoutes = require("./src/components/usuarioproyecto/api/usuarioproyecto.api");
var session = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));

app.use('/api/historiausuario', historiaUsuarioRoutes)
//app.use("/api/logs", logsRoutes);
app.use('/api/organizacion', organizacionRoutes)
app.use("/api/plan", planRoutes);
app.use('/api/proyecto', proyectoRoutes)
app.use("/api/ticket", ticketRoutes);
app.use("/api/usuario", usuarioRoutes);
app.use("/api/watson", watsonRoutes);
app.use("/api/usuarioproyecto", usuarioProyectoRoutes);


// 3. Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server listening on port ", port);
});
