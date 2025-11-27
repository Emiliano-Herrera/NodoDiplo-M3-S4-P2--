import SuperHeroRepository from "../repositories/SuperHeroRepository.mjs";

export async function obtenerSuperHeroePorId(id) {
    return await SuperHeroRepository.obtenerPorId(id)
}

export async function obtenerTodosLosSuperHeroes() {
    return await SuperHeroRepository.obtenerTodos()
}

export async function buscarSuperHeroesPorAtributo(atributo, valor) {
    return await SuperHeroRepository.buscarPorAtributo(atributo, valor)
}

export async function obtenerSuperHeroesMayoresDe30() {
    return await SuperHeroRepository.obtenerMayoresDe30()
}

export async function crearSuperHeroe(datosSuperHeroe) {
    return await SuperHeroRepository.crear(datosSuperHeroe);
}

export async function actualizarSuperHeroe(id, datosActualizados){
    return await SuperHeroRepository.actualizarPorId(id, datosActualizados);
}

export async function eliminarSuperHeroePorId(id) {
    return await SuperHeroRepository.eliminarPorId(id);
}

export async function eliminarSuperPorNombre(nombreSuperHeroe) {
    return await SuperHeroRepository.eliminarPorNombre(nombreSuperHeroe);
}