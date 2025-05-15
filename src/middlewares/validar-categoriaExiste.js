import Categoria from '../categorias/categorias-model.js';

export const obtenerCategoriaPorNombre  = async (nombreCategoria) => {
  const categoria = await Categoria.findOne({
    categoria: { $regex: new RegExp(`^${nombreCategoria}$`, 'i') }
  })

  if (!categoria) {
    const error = new Error("La categoría proporcionada no existe en la Base de Datos. O puede agregar esa nueva categoría.");
    error.status = 400;
    throw error;
  }

  return categoria._id
}