import { response, request } from 'express';
import UsuarioModel from '../models/UsuarioModel.js';
import bcryptjs from 'bcryptjs'; // Encriptar contraseñas
import { generarJWT } from '../helpers/jwt.js';
import { emailYaRegistrado } from '../helpers/validacionesDB.js';








//^ POST - Registro de usuario

const crearUsuario = async ( req = request, res = response ) => {
    const { name, email, password } = req.body;


    try {


        
        // Verificar si el email ya está registrado
        if ( await emailYaRegistrado( email ) ) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya está registrado",
            });
        }

        // Se crea el usuario
        const usuario = new UsuarioModel({ name, email, password }); //^ Creamos un nuevo usuario con los datos que vienen en el body


        // Grabar en la base de datos
        await usuario.save();


        // Generar el JWT
        const token = await generarJWT( usuario.id, usuario.name );
    
        res.status(201).json({
            ok: true,
            msg: "Usuario creado con éxito",
            uid : usuario.id,
            name : usuario.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};



//^ POST - Login de usuario

const loginUsuario = async ( req = request, res = response ) => {
    const { email, password } = req.body;

    try {
        const usuario = await UsuarioModel.findOne({ email });
    
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe con ese email",
            });
        }

        // Confirmar los passwords
        const validPassword = bcryptjs.compareSync( password, usuario.password );   //^ Comparamos el password que viene en el body con el password que está en la BD

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: "Password incorrecto",
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid : usuario.id,
            name : usuario.name,
            token
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el Administrador",
        });
    }
};



//^ GET - Renovar token

const renovarToken = async ( req = request, res = response ) => {

    const { uid, name } = req;


    // Generar un nuevo JWT y retornarlo en esta petición
    const token = await generarJWT( uid, name );



    res.json({
        ok: true,
        msg: "Token renovado",
        uid,
        name,
        token
    });
};







export { 
    crearUsuario,
    loginUsuario,
    renovarToken,
}