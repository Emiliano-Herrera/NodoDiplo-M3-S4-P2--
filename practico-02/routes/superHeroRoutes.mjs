import express from 'express';


import { 
    ObtenerSuperHeroePorIdController,
    buscarSuperHeroesPorAtributoController, 
    obtenerSuperHeroesMayoresDe30Controller, 
    crearSuperHeroeController, 
    actualizarSuperHeroeController, 
    eliminarSuperPorIdController, 
    eliminarSuperPorNombreController, 
    mostrarFormularioAgregarController, 
    mostrarFormularioEditarController,
    mostrarMenu, 
    aboutController, 
    contactController, 
    indexController
    
} from '../controllers/superheroesController.mjs';

import { 
    validarCrearSuperHeroe, 
    validarActualizarSuperHeroe, 
    validarId, 
    validarNombre 
} from '../validation/validationRules.js';
import { handleValidationErrors } from '../validation/errorMiddleware.js';
const router = express.Router();

// ====================
// RUTAS DE VISTAS
// ====================
// Formulario para agregar superheroes
router.get('/heroes/nuevo', mostrarFormularioAgregarController);
// Formulario para editar superheroes
router.get('/heroes/editar/:id', mostrarFormularioEditarController);
// Mostrar todos los super en la vista principal...
router.get('/menu', mostrarMenu);
// Mostrar pag de about
router.get('/about', aboutController);
// Mostrar pag de contact
router.get('/contact', contactController);
// Mostrar index
router.get('/index', indexController);

// ====================
// RUTAS DE API
// ====================
router.get('/heroes/:id', ObtenerSuperHeroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperHeroesPorAtributoController);
router.get('/heroes/mayor/mayores-30', obtenerSuperHeroesMayoresDe30Controller);

// Rutas POST
router.post('/crearSuperHeroe', validarCrearSuperHeroe, handleValidationErrors, crearSuperHeroeController);

// Rutas PUT
router.put('/actualizarHeroe/:id', validarActualizarSuperHeroe, handleValidationErrors, actualizarSuperHeroeController);

// Rutas DELETE
router.delete('/eliminarSuperID/:id', validarId, handleValidationErrors, eliminarSuperPorIdController);
router.delete('/eliminarSuperNombre/:nombreSuperHeroe', validarNombre, handleValidationErrors, eliminarSuperPorNombreController);

// ==============================================



export default router;