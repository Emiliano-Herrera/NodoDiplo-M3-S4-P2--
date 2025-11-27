export function renderizarSuperHeroe(superheroe) {

    return {
        id: superheroe.id,
        Nombre: superheroe.nombreSuperHeroe,
        "Nombre Real": superheroe.nombreReal,
        Edad: superheroe.edad,
        "Planeta Origen": superheroe.planetaOrigen,
        Debilidad: superheroe.debilidad,
        Poderes: superheroe.poderes,
        "Habilidad Especial": superheroe.habilidadEspecial,
        Aliados: superheroe.aliados,
        Enemigos: superheroe.enemigos
    };
}

export function renderizarListaSuperHeroes(superheroes){
    return superheroes.map(superheroe => renderizarSuperHeroe(superheroe));
}