const {roles} = require('../usuario/model/usuario.model')
const jwt = require('jsonwebtoken');
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


function ensureToken(req,res, next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !=='undefined') {
        //const bearer = bearerHeader.split(' ');
        const bearerToken = bearerHeader;
        req.token = bearerToken;
        jwt.verify(req.token, 'my_secret_key', function(err, data){
            if(err){
                res.sendStatus(403);
            } else {
                next();
            }
        })

    } else{
        res.sendStatus(403);
    }
}
module.exports = {
    authAdmin,
    authCliente,
    authAnalista,
    ensureToken
}
