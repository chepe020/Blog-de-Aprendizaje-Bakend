import Publication from '../publication/publication-model.js';

export const validarTituloUnico = async (titulo = '') => {
  const existe = await Publication.findOne({ titulo });

  if (existe) {
    const error = new Error(`Ya existe una publicación con el título "${titulo}"`);
    error.status = 400;
    throw error;
  }
}