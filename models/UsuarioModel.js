import bcryptjs from 'bcryptjs'; // Encriptar contraseñas
import mongoose from "mongoose";
const { Schema, model } = mongoose;



const usuarioSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "El correo ya está registrado"]
    },
    password: {
        type: String,
        required: true,
    },
});




// Encriptar contraseña
usuarioSchema.pre('save', async function(next) {

    // Si el password no ha sido modificado, no lo encriptamos
    if (!this.isModified('password')) { 
        return next();
    }

    const salt = await bcryptjs.genSalt(10);  // Este es el numero de vueltas que se le da a la encriptacion
    this.password = await bcryptjs.hash(this.password, salt);   // Encriptamos la contraseña
});



export default model('Usuario', usuarioSchema);