
const express = require('express')
const router = express.Router()
const usuarioController = require('../controller/usuario.controller');
const {authAdmin} = require("../../auth/auth");

//login
router.post('/login',usuarioController.login);
//logOut
router.get('/logout',usuarioController.logOut);

// Create a new usuario
router.post('/', usuarioController.create);
// Retrieve a single usuario with id and verification rol Administrador
router.get('/:id',authAdmin, usuarioController.findById);
// Retrieve all usuario
router.get('/', usuarioController.findAll);


// Update a usuario with id
router.put('/:id', usuarioController.update);

// Delete a usuario with id
router.delete('/:id', usuarioController.delete);

router.get('/inactive/:id', usuarioController.changeToInactive);

router.post('/change-password', usuarioController.changePassword);


module.exports = router
