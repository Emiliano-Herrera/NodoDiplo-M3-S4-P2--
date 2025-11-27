class IRepository {
    obtenerPorId(id){
        throw new Error("Método 'obtenerPorId()' no implementado.")
    }

    obtenerTodos(){
        throw new Error("Método 'obtenerTodos' no implementado.");
    }

    buscarPorAtributo(atributo, valor){
        throw new Error("Método 'buscarPorAtributo' no implementado.");
    }

    obtenerMayoresDe30(){
        throw new Error("Método 'obtenerMayoresDe30' no implementado.");
    }

    crearSuperHeroe(datosSuperHeroe){
        throw new Error("Método 'crearSuperHeroe' no implementado.");
    }

    actualizarPorId(id, datosActualizados){
        throw new Error("Método 'actualizarPorId' no implementado.");
    }

    eliminarPorId(id){
        throw new Error("Método 'eliminarPorId' no implementado.");
    }

    eliminarPorNombre(nombreSuperHeroe){
        throw new Error("Método 'eliminarPorNombre' no implementado.");
    }
}

export default IRepository;