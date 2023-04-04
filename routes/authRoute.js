import { Router } from "express";
import { crearUsuario, loginUsuario, renovarToken } from "../controllers/authController.js";
import { check } from 'express-validator';
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
//import { emailValido } from "../helpers/validacionesDB.js";


const authRoute = Router();





//~ Middlewares

const validarName = [ check('name', 'El nombre es obligatorio').not().isEmpty() ];  
const validarEmail = [ check('email', 'El correo es obligatorio').isEmail() ];
const validarPassword = [ check('password', 'La contraseña debe tener un mínimo de 6 caracteres').isLength({ min: 6 }) ];




//^ POST - Registro de usuario
authRoute.post("/registro",
                validarName,
                validarEmail,
                validarPassword,
                validarCampos,
                crearUsuario );



//^ POST - Login de usuario
authRoute.post("/",
                validarEmail,
                validarPassword,
                validarCampos,
                loginUsuario );




//^ GET - Renovar token
authRoute.get("/renew", 
                    validarJWT,
                    renovarToken);




export default authRoute;