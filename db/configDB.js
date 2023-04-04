import mongoose from "mongoose";
import colors from 'colors';    // Importar módulo colors


const conectionDB = async () => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN );
        console.log('Base de datos ONLINE'.green);
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar con la base de datos'.red);
    }
};





export {
    conectionDB
};