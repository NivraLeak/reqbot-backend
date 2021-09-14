const {roles} = require('../usuario/model/usuario.model')

var authAdmin = function(req, res, next) {
    if (req.session.user)
        if (req.session.user.rol === roles.ADMINISTRADOR) {
            return next();
        } else {
            return res.sendStatus(401);
        }
    else
        return res.sendStatus(401);
};

var authAnalista = function (req,res,next) {
    if (req.session.user)
        if (req.session.user.rol === roles.ANALISTA) {
            return next();
        } else {
            return res.sendStatus(401);
        }
    else
        return res.sendStatus(401);
}

var authCliente = function (req,res,next) {
    if (req.session.user)
        if (req.session.user.rol === roles.CLIENTE) {
            return next();
        } else {
            return res.sendStatus(401);
        }
    else
        return res.sendStatus(401);
}

module.exports = {
    authAdmin,
    authCliente,
    authAnalista
}
