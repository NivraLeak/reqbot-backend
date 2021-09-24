'use strict';

const {Usuario} = require('../model/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
//const {transporter} = require('../../emailConfig/emailConfig')
const password = require('password-gen-v1')
exports.create = async function (req, res) {
    const new_usuario = new Usuario(req.body);
        try{
            if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                res.status(400).send({error: true, message: 'Please provide all required field'});
            } else {
                const hashedPassword = await bcrypt.hash(new_usuario.contrasenia,10)
                console.log(hashedPassword);
                new_usuario.contrasenia = hashedPassword;

                Usuario.create(new_usuario, function (err, usuario) {
                    if (err)
                        res.send(err);
                    res.json({error: false, message: "Usuario added successfully!", data: usuario});
                });
            }
        }catch(e){
            res.json({message: e.toString()});
        }

    //handles null error

};

exports.login = async function (req, res) {
    Usuario.findByCorreo(req.body.correo, async function (err, usuario) {
        const user = usuario[0];
        try {
            const match = await bcrypt.compare(req.body.contrasenia, user.contrasenia);
            const accessToken = jwt.sign(JSON.stringify(user), "my_secret_key");
            //console.log(accessToken)
            console.log(req.session)
            if (match) {
                req.session.user = usuario[0]
                req.session.accessToken = accessToken
                res.json({
                    message: "Success",
                    accessToken: accessToken,
                })
            }else {
                res.send('Not allowed, invalid credentials')
            }
        }catch (e){
            console.log(e);
            res.status(400).json(
                {
                    message: 'Cannot find user',
                    err: e
                }
            );
        }
    })
}

exports.logOut = function (req,res) {
    req.session.destroy()
    console.log("SESSIONNNNNNNN")
    console.log(req.session)
    res.send({
        message: "Log out"
    })
}
exports.findAll = function(req, res) {
    Usuario.findAll(function(err, usuario) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', usuario);
    res.send(usuario);

  });
};
exports.findById = function(req, res) {

    Usuario.findById(req.params.id, function(err, usuario) {
        if (err)
        res.send(err);
        res.json(usuario);
    });
};

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Usuario.update(req.params.id, new usuario(req.body), function(err, usuario) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Usuario successfully updated' });
        });
    }

};

exports.delete = function(req, res) {
    Usuario.delete( req.params.id, function(err, usuario) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Usuario successfully deleted' });
  });
};

exports.changeToInactive = (req, res) => {
    Usuario.changeStateToInactive(req.params.id, (err, result) => {
        if(err) {
            res.send(err);
        }
        res.json({ error:false, message: 'Usuario inactive' })
    })
}

exports.changePassword = async (req, res) => {
    let user;
    Usuario.findByCorreo(req.body.correo, async (err, usuario) => {
        if (err) {
            res.send(err);
        }else {
            user = usuario[0];
            try {
                const match = await bcrypt.compare(req.body.contrasenia, user.contrasenia);
                if (match){
                    const hashedPassword = await bcrypt.hash(req.body.newcontrasenia,10)
                    user.contrasenia = hashedPassword;
                    Usuario.changePassword(user,  (err, result) =>{
                        if (err){
                            res.send(err);
                        }else {
                            res.json({
                                message: "Success password change"
                            })
                        }
                    })
                }else {
                    res.send('Not allowed, invalid credentials')
                }
            } catch (err) {
                console.log(err);
                res.status(400).json(
                    {
                        message: 'Cannot find user',
                        err: err
                    }
                );
            }
        }

    })


}

exports.recoveryPasswordByAddress = async (req, res) => {
    let user;
    let jsonRecovery = req.body;
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'warnecklek@gmail.com', // ethereal user
            pass: 'hoxlvrggqschtdpt', // ethereal password
        },
    });
    Usuario.findByCorreo(jsonRecovery.correo, async (err, usuario) => {
        if (err) {
            res.send(err);
        }else {
            user = usuario[0];
            try{
                if (jsonRecovery.correo === user.correo){
                    const pass = password.newPassword(4)
                    const msg = {
                        from: '"The Exapress App" <example.example4@example.com>', // sender address
                        to: `${jsonRecovery.correo}`, // list of receivers
                        subject: "Recuperacion de contraseña", // Subject line
                        text: "Se brinda su nueva contraseña, se le recomienda cambiar la contraseña una vez leido este correo." +
                            `Contraseña: ${pass}`, // plain text body
                    }

                    const hashedPassword = await bcrypt.hash(pass,10)
                    user.contrasenia = hashedPassword;
                    Usuario.changePassword(user,  async (err, result) => {
                        if (err) {
                            res.send(err);
                        } else {
                                const info = await transporter.sendMail(msg);

                                console.log("Message sent: %s", info.messageId);
                                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                                // Preview only available when sending through an Ethereal account
                                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

                                res.send('Email Sent!')
                        }
                    })

                }else {
                    res.send('Not allowed, invalid credentials')
                }
            }catch (e){
                res.send('Not allowed, invalid credentials')
            }



        }

    })


}
