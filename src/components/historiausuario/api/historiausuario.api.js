
const express = require('express')
const router = express.Router()
const historiausuarioController = require('../controller/historiausuario.controller');

// Create a new historiausuario
router.post('/', historiausuarioController.create);

// Retrieve all historiausuario
router.get('/', historiausuarioController.findAll);

// Retrieve a single historiausuario with id
router.get('/:id', historiausuarioController.findById);

// Update a historiausuario with id
router.put('/:id', historiausuarioController.update);

// Delete a historiausuario with id
router.delete('/:id', historiausuarioController.delete);

// Get user histories with id project
router.get('/project/:id', historiausuarioController.getByIdProject);

router.get('/download/project/:id', historiausuarioController.downloadPromise);

module.exports = router
