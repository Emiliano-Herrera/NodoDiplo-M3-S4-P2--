import superHero from "../models/SuperHero.mjs";
import { obtenerSuperHeroePorId, obtenerTodosLosSuperHeroes, buscarSuperHeroesPorAtributo, obtenerSuperHeroesMayoresDe30, crearSuperHeroe, actualizarSuperHeroe, eliminarSuperHeroePorId, eliminarSuperPorNombre } from "../services/superheroesService.mjs";
import { renderizarSuperHeroe, renderizarListaSuperHeroes } from '../views/responseView.mjs';

// Controlador para página Index
export async function indexController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperHeroes();
        
        // Enviamos todos los superhéroes y hacemos los filtros en el EJS
        res.render('index', {
            title: 'Inicio - App Superhéroes',
            currentPage: 'inicio',
            superheroes: superheroes || [] // Aseguramos que siempre sea un array
        });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al cargar la página Inicio', error: error.message });
    }
}

// Controlador para página Acerca de
export async function aboutController(req, res) {
    try {
        res.render('about', {
            title: 'Acerca de Nosotros',
            currentPage: 'about'
        });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al cargar la página Acerca de', error: error.message });
    }
}

// Controlador para página Contacto
export async function contactController(req, res) {
    try {
        res.render('contact', {
            title: 'Contáctanos',
            currentPage: 'contact'
        });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al cargar la página de Contacto', error: error.message });
    }
}

// Controlador para mostrar el formulario de agregar superhéroe
export async function mostrarFormularioAgregarController(req, res) {
    try {
        res.render('addSuperhero', {
            title: 'Agregar superheroe'
        });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al cargar el formulario', error: error.message });
    }
}

// Controlador para mostrar el formulario de editar superhéroe
export async function mostrarFormularioEditarController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperHeroePorId(id);

        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }

        res.render('editSuperhero', { superheroe, title: 'editar superheroe' });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al cargar el formulario de edición', error: error.message });
    }
}

// Obtener super por id
export async function ObtenerSuperHeroePorIdController(req, res) {
    try{

        const {id} = req.params;
        const superheroe = await obtenerSuperHeroePorId(id);
        console.log(superheroe);
        if(!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado, capo!' });
        }

        const superheroeFormateado = renderizarSuperHeroe(superheroe);
        res.status(200).json(superheroeFormateado);

    } catch (error) {
        
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe por ID', error: error.menssage });

    }
}

// Obtenemos a todos los super y los mostramos renderizados en la vista principal
export async function mostrarMenu(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperHeroes();

        return res.render('dashboard', { superheroes, title: 'Lista de superheroes' });

    }catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}

export async function buscarSuperHeroesPorAtributoController(req, res) {
    
    try {

        const {atributo, valor} = req.params;
        const superheroes = await buscarSuperHeroesPorAtributo(atributo, valor);

        if(superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes con ese atributo' });
        }

        const superheroeFormateado = renderizarListaSuperHeroes(superheroes);
        res.status(200).json(superheroeFormateado);


    } catch(error) {

        res.status(500).send({ mensaje: 'Error al buscar los superhéroes por atributo.', error: error.menssage });

    }

}


export async function obtenerSuperHeroesMayoresDe30Controller(req, res) {
    
    try {

        const superheroes = await obtenerSuperHeroesMayoresDe30();
        console.log(superheroes);
        if(superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes mayores de 30 años' });
        }

        const superheroeFormateado = renderizarListaSuperHeroes(superheroes);
        res.status(200).json(superheroeFormateado);


    } catch(error){
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes mayores de 30.', error: error.menssage });
    }

}

// crear un super
export async function crearSuperHeroeController(req, res) {
    try {
        const datosSuperHeroe = req.body;

        const superHeroeCreado = await crearSuperHeroe(datosSuperHeroe);
        const superFormateado = renderizarSuperHeroe(superHeroeCreado); 

        res.status(201).json({
            mensaje: 'Superheroe creado correctamente',
            superheroe: superFormateado 
        })

    } catch(error) {
        res.status(500).send({ mensaje: 'Error al crear superhéroes y mostrarlo.', error: error.menssage });
    }
}

// actualizar el super por id
export async function actualizarSuperHeroeController(req, res) {
    try {

        const {id} = req.params;
        const datosActualizados = req.body;

        const superHeroeActualizado = await actualizarSuperHeroe(id, datosActualizados);
        const superheroeFormateado = renderizarSuperHeroe(superHeroeActualizado);

        res.status(200).json({
            mensaje: 'Superhéroe actualizado exitosamente',
            data: superheroeFormateado
        });

    } catch(error) {
        if (error.message === 'Superhéroe no encontrado') {
            return res.status(404).send({ mensaje: error.message });
        }
        res.status(400).send({ 
            mensaje: 'Error al actualizar el superhéroe', 
            error: error.message 
        });
    }
}

// eliminar un super por id
export async function eliminarSuperPorIdController(req, res) {
    try {
        
        const {id} = req.params;

        const superheroeEliminado = await eliminarSuperHeroePorId(id);
        const superheroeFormateado = renderizarSuperHeroe(superheroeEliminado);

        res.status(200).json({
            mensaje: 'Superhéroe eliminado por ID exitosamente',
            data: superheroeFormateado
        });

    } catch (error) {

        /* if (error.message === 'Superhéroe no encontrado') {
            return res.status(404).send({ mensaje: error.message });
        } */
        res.status(500).send({ 
            mensaje: 'Error al eliminar el superhéroe por Id', 
            error: error.message 
        });

    }
}

// eliminar super por Nombre
export async function eliminarSuperPorNombreController(req, res) {
    try {
        
        const {nombreSuperHeroe} = req.params;
        const superheroeEliminado = await eliminarSuperPorNombre(nombreSuperHeroe);
        const superheroeFormateado = renderizarSuperHeroe(superheroeEliminado);

        res.status(200).json({
            mensaje: 'Superhéroe eliminado por Nombre exitosamente',
            data: superheroeFormateado
        });

    } catch (error) {
        res.status(500).send({ 
            mensaje: 'Error al eliminar el superhéroe por Nombre', 
            error: error.message 
        });
    }
}