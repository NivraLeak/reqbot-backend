'use strict';

const {HistoriaUsuario} = require('../model/historiausuario.model');
const styles = require('../../pdfConfig/styles');
const {content} = require('../../pdfConfig/pdfContentUH');
const PdfPrinter = require('pdfmake');
const fs = require('fs');

const path = require('path');
const {Usuario} = require("../../usuario/model/usuario.model"); // path is give you a working directory path.resolve() and you can give your font file path.

const fontDescriptors = {
    Roboto: {
        normal: path.resolve('src/components/pdfConfig/fonts/Roboto-Regular.ttf'),
        bold: path.resolve('src/components/pdfConfig/fonts/Roboto-Medium.ttf'),
        italics: path.resolve('src/components/pdfConfig/fonts/Roboto-Italic.ttf'),
        bolditalics: path.resolve('src/components/pdfConfig/fonts/Roboto-BoldItalic.ttf')
    }
}

const printer = new PdfPrinter(fontDescriptors);

exports.create = function(req, res) {
    const new_historiausuario = new HistoriaUsuario(req.body);

    //handles null error
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        HistoriaUsuario.create(new_historiausuario, function(err, historiausuario) {
            if (err)
            res.send(err);
            res.json({error:false,message:"HistoriaUsuario added successfully!",data:historiausuario});
        });
    }
};

exports.findAll = function(req, res) {
    HistoriaUsuario.findAll(function(err, historiausuario) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', historiausuario);
    res.send(historiausuario);
  });
};

exports.findById = function(req, res) {
    HistoriaUsuario.findById(req.params.id, function(err, historiausuario) {
        if (err)
        res.send(err);
        res.json(historiausuario);
    });
};

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        HistoriaUsuario.update(req.params.id, new HistoriaUsuario(req.body), function(err, historiausuario) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'HistoriaUsuario successfully updated' });
        });
    }

};

exports.delete = function(req, res) {
    HistoriaUsuario.delete( req.params.id, function(err, historiausuario) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'HistoriaUsuario successfully deleted' });
  });
};

exports.download = function (req, res) {
    HistoriaUsuario.findByIdProject(req.params.id, function(err, userHistories) {
        if (err)
            res.send(err);
        else{
            const arrPdfUserHistories = userHistories[0];
            for (let uh in userHistories) {
                Usuario.findById(userHistories[uh].modificadoPor, (err, user) =>{
                    if(err)
                        res.send(err);
                    else {
                        let docDefinition = {
                            content: [
                                {
                                    color: '#444',
                                    style: 'header',
                                    table: {
                                        heights: ['*', 120, 70, 70, 70, 100],
                                        widths: [170, '*', 300],
                                        headerRows:1,
                                        body: [
                                            [ {text: "Header" ,colSpan: 3, alignment: 'center'},{},{} ],
                                            [ {
                                                stack:  [
                                                    'Numero',
                                                    { text:' ', style: 'numberUs' },
                                                    { text:`${userHistories[uh].idHistoriaUsuario}`, style: 'numberUH'},
                                                    { text:' ', style: 'numberUs' },
                                                ]
                                            }, {
                                                stack:  [
                                                    'Nombre',
                                                    { text:' ', style: 'numberUs' },
                                                    { text:' ', style: 'numberUs' },
                                                    { text:' ', style: 'numberUs' },
                                                    { text:' ', style: 'numberUs' },
                                                    { text:' ', style: 'numberUs' },
                                                    { text:`${uh.nombre}`, style: 'numberUs' },

                                                ],  colSpan:2, rowSpan:4, alignment: 'center'},{} ],
                                            [ {
                                                stack:  [
                                                    'Prioridad',
                                                    { text:' ', style: 'numberUs' },
                                                    { text:`${userHistories[uh].idHistoriaUsuario}`, style: 'numberUs'},
                                                    { text:' ', style: 'numberUs' },
                                                ]
                                            }, {}
                                            ],
                                            [ {
                                                stack:  [
                                                    'Puntos Estimados',
                                                    { text:' ', style: 'numberUs' },
                                                    { text:`${user[0].nombre}`, style: 'numberUs'},
                                                    { text:' ', style: 'numberUs' },
                                                ]
                                            }, {}],
                                            [ {
                                                stack:  [
                                                    'Modificado por',
                                                    { text:' ', style: 'numberUs' },
                                                    { text:`${user[0].nombre}`, style: 'numberUs'},
                                                    { text:' ', style: 'numberUs' },
                                                ]
                                            }, {}],
                                            [ {

                                                stack:  [
                                                    'Descripcion',
                                                    { text:' ', style: 'numberUs' },
                                                    { text:`${userHistories[uh].funcionalidad}`, style: 'description'},
                                                    { text:' ', style: 'numberUs' },
                                                ],
                                                colSpan:3}, {},{}]

                                        ]
                                    }
                                }
                            ],
                            styles: {
                                header: {
                                    fontSize: 17,
                                    bold: true,
                                    margin: [10,10,10, 10]
                                },
                                tableHeader: {
                                    bold: true,
                                    fontSize: 13,
                                    color: 'black'
                                },
                                numberUs: {
                                    bold: true,
                                    fontSize: 20,
                                    color: 'black',
                                    alignment: 'center'
                                },
                                numberUH: {
                                    bold: true,
                                    fontSize: 40,
                                    color: 'black',
                                    alignment: 'center'
                                },
                                description: {
                                    color: 'black',
                                    fontSize: 15,
                                    alignment: 'center'
                                },
                            },
                        }
                        arrPdfUserHistories.push(docDefinition)
                        res.json(arrPdfUserHistories);
                    }
                })
            }
        }
    });
};

exports.downloadPromise = async function (req, res) {
    try {
        var userHistories = await HistoriaUsuario.findByIdProjectPromise(req.params.id);
        var arrPdfUserHistories = [];
        for (let uh in userHistories) {
            var user = await Usuario.findByIdPromise(userHistories[uh].modificadoPor)
            let docDefinition = {
                content: [
                    {
                        color: '#444',
                        style: 'header',
                        table: {
                            heights: ['*', 120, 70, 70, 70, 100],
                            widths: [170, '*', 300],
                            headerRows:1,
                            body: [
                                [ {text: "Header" ,colSpan: 3, alignment: 'center'},{},{} ],
                                [ {
                                    stack:  [
                                        'Numero',
                                        { text:' ', style: 'numberUs' },
                                        { text:`${userHistories[uh].idHistoriaUsuario}`, style: 'numberUH'},
                                        { text:' ', style: 'numberUs' },
                                    ]
                                }, {
                                    stack:  [
                                        'Nombre',
                                        { text:' ', style: 'numberUs' },
                                        { text:' ', style: 'numberUs' },
                                        { text:' ', style: 'numberUs' },
                                        { text:' ', style: 'numberUs' },
                                        { text:' ', style: 'numberUs' },
                                        { text:`${userHistories[uh].nombre}`, style: 'numberUs' },

                                    ],  colSpan:2, rowSpan:4, alignment: 'center'},{} ],
                                [ {
                                    stack:  [
                                        'Prioridad',
                                        { text:' ', style: 'numberUs' },
                                        { text:`${userHistories[uh].idHistoriaUsuario}`, style: 'numberUs'},
                                        { text:' ', style: 'numberUs' },
                                    ]
                                }, {}
                                ],
                                [ {
                                    stack:  [
                                        'Puntos Estimados',
                                        { text:' ', style: 'numberUs' },
                                        { text:`${user[0].nombre}`, style: 'numberUs'},
                                        { text:' ', style: 'numberUs' },
                                    ]
                                }, {}],
                                [ {
                                    stack:  [
                                        'Modificado por',
                                        { text:' ', style: 'numberUs' },
                                        { text:`${user[0].nombre}`, style: 'numberUs'},
                                        { text:' ', style: 'numberUs' },
                                    ]
                                }, {}],
                                [ {

                                    stack:  [
                                        'Descripcion',
                                        { text:' ', style: 'numberUs' },
                                        { text:`${userHistories[uh].funcionalidad}`, style: 'description'},
                                        { text:' ', style: 'numberUs' },
                                    ],
                                    colSpan:3}, {},{}]

                            ]
                        }
                    }
                ],
                styles: {
                    header: {
                        fontSize: 17,
                        bold: true,
                        margin: [10,10,10, 10]
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black'
                    },
                    numberUs: {
                        bold: true,
                        fontSize: 20,
                        color: 'black',
                        alignment: 'center'
                    },
                    numberUH: {
                        bold: true,
                        fontSize: 40,
                        color: 'black',
                        alignment: 'center'
                    },
                    description: {
                        color: 'black',
                        fontSize: 15,
                        alignment: 'center'
                    },
                },
            }
            arrPdfUserHistories.push(docDefinition)
        }
        res.json(arrPdfUserHistories);
        console.log(arrPdfUserHistories)
    }catch (e){
        console.log(e)
    }
};

exports.getByIdProject = (req, res) => {
    HistoriaUsuario.findByIdProject(req.params.id, function (err, userHistories) {
        if(err)
            res.send(err);
        res.json(userHistories);
    })
}
