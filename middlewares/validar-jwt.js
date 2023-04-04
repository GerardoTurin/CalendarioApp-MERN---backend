import  jwt  from "jsonwebtoken";
import { response, request } from 'express';
//import UsuarioModel from "../models/UsuarioModel";



const validarJWT = (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }

    try {
        
        const { uid, name } = jwt.verify(token, process.env.SECRETORPRIVATEKEY_JWT);

        req.uid = uid;
        req.name = name;

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();
};



export { validarJWT };