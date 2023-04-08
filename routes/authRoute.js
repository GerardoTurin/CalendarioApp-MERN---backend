import { Router } from "express";
import { crearUsuario, loginUsuario, renovarToken } from "../controllers/authController.js";
import { check } from 'express-validator';
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";


const authRoute = Router();





//~ Middlewares

const validarName = [ check('name', 'El nombre es obligatorio').not().isEmpty() ];  //^ El nombre no puede estar vacío
const validarEmail = [ check('email', 'El Email es obligatorio').isEmail() ];   //^ El email debe ser un email válido
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