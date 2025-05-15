import { Schema, model } from 'mongoose';

const ComentarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del autor es obligatorio']
    },
    contenido: {
        type: String,
        required: [true, 'El contenido del comentario es obligatorio']
    },
    publicacion: {
        type: Schema.Types.ObjectId,
        ref: 'Publication',
        required: [true, 'La publicación a la que pertenece es obligatoria']
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Comentario', ComentarioSchema);
