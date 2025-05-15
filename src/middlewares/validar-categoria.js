import Categoria from '../categorias/categorias-model.js';

export const validarCategoriaRepetida = async (nombreCategoria = '') => {
    const categoriaExistente = await Categoria.findOne({
        categoria: { $regex: new RegExp(`^${nombreCategoria}$`, 'i') }
    });

    if (categoriaExistente) {
        throw new Error('Ya existe una categoría con ese nombre');
    }
};
