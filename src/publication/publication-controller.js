import Publication from './publication-model.js';
import { obtenerCategoriaPorNombre  } from '../middlewares/validar-categoriaExiste.js';
import {validarTituloUnico} from '../middlewares/validar-publicacionExiste.js'

export const savePublication = async (req, res) => {
    try {
        const { titulo, descripcion, categoria } = req.body

        if (!titulo || !descripcion || !categoria) {
            return res.status(400).json({ success: false, msg: "Todos los campos son obligatorios" })
        }

        await validarTituloUnico(titulo)

        const idCategoria = await obtenerCategoriaPorNombre(categoria)

        const nuevaPublicacion = new Publication({
            titulo,
            descripcion,
            categoria: idCategoria
        })

        await nuevaPublicacion.save()

        return res.status(201).json({
            success: true,
            msg: "Publicación creada exitosamente",
            publication: nuevaPublicacion
        })
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            msg: error.message || "Error al crear la publicación"
        })
    }
}

export const getPublications = async (req, res) => {
    try {
        const publicaciones = await Publication.find()
            .populate('categoria', 'categoria') 
            .sort({ createdAt: -1 })

        return res.status(200).json({ success: true, publicaciones })
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Error al obtener publicaciones", error })
    }
}

export const updatePubli = async (req, res) => {
    try {
        const { id } = req.params
        const { titulo, descripcion, categoria } = req.body

        if (!titulo || !descripcion || !categoria) {
            return res.status(400).json({ success: false, msg: "Todos los campos son obligatorios" })
        }

        const idCategoria = await obtenerCategoriaPorNombre(categoria)

        const updated = await Publication.findByIdAndUpdate(
            id,
            {
                titulo,
                descripcion,
                categoria: idCategoria
            },
            { new: true }
        )

        if (!updated) {
            return res.status(404).json({ success: false, msg: "Publicación no encontrada" })
        }

        return res.status(200).json({
            success: true,
            msg: "Publicación actualizada correctamente",
            publication: updated
        })
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            msg: error.message || "Error al actualizar la publicación"
        })
    }
}

export const eliminarPubli = async (req, res) => {
    try {
        const { id } = req.params

        const deleted = await Publication.findByIdAndDelete(id)

        if (!deleted) {
            return res.status(404).json({ success: false, msg: "Publicación no encontrada" })
        }

        return res.status(200).json({ success: true, msg: "Publicación eliminada correctamente", publication: deleted })
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Error al eliminar la publicación", error })
    }
}