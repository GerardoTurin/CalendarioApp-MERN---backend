import { Router } from "express";
import { actualizarEvento, borrarEvento, crearEvento, getEventos } from "../controllers/eventsController.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { isDate } from "../helpers/isDate.js";



const eventsRoute = Router();

// Todas las petisiones deben pasar por validarJWT
eventsRoute.use( validarJWT );





//~ Middlewares - Validaciones

const validarTitle = [ check('title', 'El título es obligatorio').not().isEmpty() ];
const validarStart = [ check('start', 'La fecha de inicio es obligatoria').custom( isDate ) ];
const validarEnd = [ check('end', 'La fecha de finalización es obligatoria').custom( isDate ) ];







//^ Obtener eventos

eventsRoute.get('/',
                getEventos);



//^ Crear nuevo evento

eventsRoute.post('/',
                validarTitle,
                validarStart,
                validarEnd,
                validarCampos,
                crearEvento);



//^ Actualizar evento

eventsRoute.put('/:id',
                actualizarEvento);



//^ Borrar evento

eventsRoute.delete('/:id', 
                    borrarEvento);





export default eventsRoute;