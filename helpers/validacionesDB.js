import UsuarioModel from "../models/UsuarioModel.js";



const emailYaRegistrado = async ( email ) => {
    const emailExiste = await UsuarioModel.findOne({ email });
    return !!emailExiste;   //^ Si el email existe, devuelve true. Si no existe, devuelve false
};










export { 
    emailYaRegistrado
};