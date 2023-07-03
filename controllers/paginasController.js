import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) => { 
    //Consultar 3 viajes del modelo Viaje

    //Usar Promise.all para que se ejecuten al mismo tiempo - Mejor rendimiento
    const promiseDB = [];

    promiseDB.push( Viaje.findAll({ limit: 3 }) );
    promiseDB.push( Testimonial.findAll({ limit: 3 }) );

    try {
        // const viajes = await Viaje.findAll({ limit: 3 });             <- Esto no es tan escalable (Mejor con Promise.all)
        // const testimoniales = await Testimonial.findAll({ limit: 3 })

        const resultado = await Promise.all( promiseDB );

        res.render('inicio',{
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        })
    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros',
        });
}

const paginaViajes = async (req, res) => {
    //Consulta a la BD
    const viajes = await Viaje.findAll();

    res.render('viajes',{
        pagina: 'Proximos Viajes',
        viajes,    
    })
}

const paginaTestimoniales = async (req, res) => {
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        })   
    } catch (error) {
        console.log(error);  
    }
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where : { slug }});

        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
}


export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
};