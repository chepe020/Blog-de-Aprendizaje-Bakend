import Publication from "../publication/publication-model.js";
import Comentario from "./comentarios-model.js";

export const addComment = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, contenido } = req.body;

        if (!nombre || !contenido) {
            return res.status(400).json({
                success: false,
                msg: "El nombre y el contenido son obligatorios"
            });
        }

        const publicacion = await Publication.findById(id);
        if (!publicacion) {
            return res.status(404).json({
                success: false,
                msg: "Publicación no encontrada"
            });
        }

        const nuevoComentario = await Comentario.create({
            nombre,
            contenido,
            publicacion: id
        });

        res.status(201).json({
            success: true,
            msg: "Comentario agregado con éxito",
            comentario: nuevoComentario
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al agregar el comentario",
            error: error.message || error
        });
    }
};

export const getCommentsByPublication = async (req, res) => {
    try {
        const { id } = req.params;

        const comentarios = await Comentario.find({ publicacion: id })
            .sort({ createdAt: -1 })
            .populate('publicacion', 'titulo')

        res.status(200).json({
            success: true,
            comentarios
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al obtener comentarios",
            error: error.message || error
        })
    }
}
