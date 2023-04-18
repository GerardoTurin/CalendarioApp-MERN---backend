import { response, request } from 'express';
import EventoModel from '../models/EventoModel.js';



//^ GET - Obtener eventos

const getEventos = async ( req = request, res = response ) => {
    
        const eventos = await EventoModel.find()
                                        .populate('user', 'name');  //^ Traemos los datos del usuario que creó el evento
    
        res.json({
            ok: true,
            eventos
        });
};






//^ POST - Crear nuevo evento

const crearEvento = async ( req = request, res = response ) => {

    const evento = new EventoModel( req.body );
    
    try {

        evento.user = req.uid;  //^ Agregamos el id del usuario que está haciendo la petición.


        // Grabar en la base de datos
        const eventoGuardado = await evento.save();

        res.status(201).json({
            ok: true,
            eventoGuardado
        });
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};




//^ PUT - Actualizar evento

const actualizarEvento = async ( req = request, res = response ) => {

    const  { id } = req.params;      // id del evento a actualizar.
    const uid = req.uid;             // id del usuario que está haciendo la petición.

    try {
        
        const evento = await EventoModel.findById( id );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado por id'
            });
        }

        if ( evento.user.toString() !== uid ) {  //^ Convertimos el id del usuario a string para poder compararlo con el id del usuario que está haciendo la petición.
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }

        const eventoActualizado = await EventoModel.findByIdAndUpdate( id, nuevoEvento, { new: true } );

        res.json({
            ok: true,
            eventoActualizado
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }


};




//^ DELETE - Borrar evento

const borrarEvento = async ( req = request, res = response ) => {

    const { id } = req.params;      // id del evento a actualizar.
    const uid = req.uid;            // id del usuario que está haciendo la petición.


    try {
        
        const evento = await EventoModel.findById( id );    //^ Buscamos el evento por id.

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado por id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }


        const eventoEliminado = await EventoModel.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Evento eliminado',
            eventoEliminado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }


};




export {
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
};