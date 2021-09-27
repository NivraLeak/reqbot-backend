'use strict';
var dbConn = require('../../../database/db.config');

//historiausuario object create
var HistoriaUsuario = function (historiausuario) {
    this.nombre = historiausuario.nombre;
    this.rol = historiausuario.rol;
    this.funcionalidad = historiausuario.funcionalidad;
    this.resultado = historiausuario.resultado;
    this.fechaModificacion = new Date(historiausuario.fechaModificacion);
    this.modificadoPor = historiausuario.modificadoPor;
    this.idProyecto = historiausuario.idProyecto;
};

HistoriaUsuario.create = function (newhistoriausuario, result) {
    dbConn.query("INSERT INTO historiausuario set ?", newhistoriausuario, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};


HistoriaUsuario.findById = function (id, result) {
    dbConn.query("Select * from bdreqbot.historiausuario where idHistoriaUsuario = ? ", id, function (err, res) {
        console.log("ID: ", id)
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

HistoriaUsuario.findAll = function (result) {
    dbConn.query("Select * from bdreqbot.historiausuario", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log('historiausuario : ', res);
            result(null, res);
        }
    });
};

HistoriaUsuario.update = function (id, historiausuario, result) {
    dbConn.query("UPDATE historiausuario SET nombre=?,rol=?,funcionalidad=?,resultado=?,fechaModificacion=?,modificadoPor=?,idProyecto=? WHERE idHistoriaUsuario = ?",
        [   historiausuario.nombre,
            historiausuario.rol,
            historiausuario.funcionalidad,
            historiausuario.resultado,
            historiausuario.fechaModificacion,
            historiausuario.modificadoPor,
            historiausuario.idProyecto,
            id
        ],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};

HistoriaUsuario.delete = function (id, result) {
    dbConn.query("DELETE FROM historiausuario WHERE idHistoriaUsuario = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

HistoriaUsuario.findByIdProject = function (id, result) {
    dbConn.query("Select * from bdreqbot.historiausuario where idProyecto = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

HistoriaUsuario.findByIdProjectPromise = async function (id) {
    return new  Promise( async (resolve,reject) => {
        dbConn.query("Select * from bdreqbot.historiausuario where idProyecto = ? ", id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                return reject(err);
            } else {
                return resolve(res);
            }
        });
    })

};

module.exports = {
    HistoriaUsuario

};
