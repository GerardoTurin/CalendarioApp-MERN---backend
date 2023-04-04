import mongoose from "mongoose";
const { Schema, model } = mongoose;



const eventoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,    //^ Especificamos que es un ObjectId, que es el id de un usuario.
        ref: 'Usuario',                //^ Referencia al modelo Usuario.
        required: true
    }
});





eventoSchema.method('toJSON', function() {
    const { __v, _id, ...evento } = this.toObject();
    evento.id = _id;  // Cambiamos el nombre del id por uID
    return evento;
});




export default model('Evento', eventoSchema);