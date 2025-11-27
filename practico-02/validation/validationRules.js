import { body, param } from 'express-validator';

// Validaciones para crear superhéroe
// array de middlewares que express-validator usa/necesita
export const validarCrearSuperHeroe = [
    body('nombreSuperHeroe')
    /* notEmpty "el campo no puede estár vacio" */
        .notEmpty().withMessage('El nombre del superhéroe es requerido') // q el nombre del heroe sea requerido...
        .trim() // elimina epacios en blanco
        .isLength({ min: 3, max: 60 }).withMessage('El nombre del superhéroe debe tener entre 3 y 60 caracteres'),// Entre 3 y 60 caracteres
    
    body('nombreReal')
        .notEmpty().withMessage('El nombre real es requerido')
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('El nombre real debe tener entre 3 y 60 caracteres'),
    
    body('edad')
        .notEmpty().withMessage('La edad es requerida') // no puede estár vacio
        .isInt({ min: 0 }).withMessage('La edad debe ser un número entero no negativo') // que sea número entero
        .toInt(), // Convierte string a numero automaticamente
    
    body('poderes')
        .isArray({ min: 1 }).withMessage('Los poderes deben ser un array con al menos un elemento') // debe ser un array con almenos un elemento
        // custom funcion que verifica que todos sean string
        .custom((poderes) => {
            if (!poderes.every(poder => typeof poder === 'string')) {
                throw new Error('Todos los poderes deben ser strings');
            }
            return true;
        }),
    // validamos cada elemento del array de poderes*
    body('poderes.*')
        .notEmpty().withMessage('Los poderes no pueden estar vacíos') // que no este vacio
        .trim() // que no tenga espacios 
        .isLength({ min: 3, max: 60 }).withMessage('Cada poder debe tener entre 3 y 60 caracteres'), // que tenga entre 3 y 60 caracteres
    

    body('planetaOrigen')
        .optional() // campo no requerido
        .trim(), // en caso de que si, valida que no tenga espacios vacios
    
    body('debilidad')
        .optional()
        .trim(),
    
    body('aliado')
        .optional()
        .isArray().withMessage('Los aliados deben ser un array'), // validamos que sea siempre un array
    
    body('aliado.*')
        .optional()
        .trim(),
    
    body('enemigo')
        .optional()
        .isArray().withMessage('Los enemigos deben ser un array'), // validamos que sea siempre un array
    
    body('enemigo.*')
        .optional()
        .trim(),
    
    body('creador')
        .optional()
        .trim()
];

// Validaciones para actualizar superhéroe
export const validarActualizarSuperHeroe = [
    param('id') // Valida el parámetro de URL (/api/actualizarHeroe/:id)
        .isMongoId().withMessage('ID inválido'), // isMongoId verifica que sea un ID de mongoDB valido
    
    body('nombreSuperHeroe')
        .optional()
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('El nombre del superhéroe debe tener entre 3 y 60 caracteres'),
    
    body('nombreReal')
        .optional()
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('El nombre real debe tener entre 3 y 60 caracteres'),
    
    body('edad')
        .optional()
        .isInt({ min: 0 }).withMessage('La edad debe ser un número entero no negativo')
        .toInt(),
    
    body('poderes')
        .optional()
        .isArray({ min: 1 }).withMessage('Los poderes deben ser un array con al menos un elemento'),
    
    body('poderes.*')
        .optional()
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('Cada poder debe tener entre 3 y 60 caracteres')
];

// Validaciones para IDs
export const validarId = [
    param('id') // Valida el parámetro de URL (/api/actualizarHeroe/:id)
        .isMongoId().withMessage('ID inválido') // isMongoId verifica que sea un ID de mongoDB valido
];

// Validaciones para nombre
export const validarNombre = [
    param('nombreSuperHeroe')
        .notEmpty().withMessage('El nombre del superhéroe es requerido')
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('El nombre debe tener entre 3 y 60 caracteres')
];