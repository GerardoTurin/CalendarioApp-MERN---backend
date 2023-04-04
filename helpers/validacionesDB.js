import UsuarioModel from "../models/UsuarioModel.js";




const emailValido = async ( email = '' ) => {

    const emailExiste = await UsuarioModel.findOne({ email });
    if ( emailExiste ) {
        throw new Error(` El email ${email} ya está registrado`);
    };
};










export { 
    emailValido,
};