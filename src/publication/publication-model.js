import { Schema, model } from 'mongoose';

const PublicationSchema = new Schema({
    titulo: {
        type: String,
        required: [true, "El título es obligatorio"]
    },
    descripcion: {
        type: String,
        required: [true, "La descripción es obligatoria"]
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, "La categoría es obligatoria"]
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Publication', PublicationSchema);
