import { Router } from 'express';
import { saveCategoria, getCategorias, deleteCategorias, updateCategoria } from './categorias-controller.js';
import { validarCampos} from '../middlewares/validar-campos.js';

const router = Router();

router.post(
    '/',
    [
        validarCampos
    ],
    saveCategoria
);

router.get('/', getCategorias);

router.delete(
    '/:id',
    [
        validarCampos
    ],
    deleteCategorias
);

router.put(
    '/:id',
    [
        validarCampos
    ],
    updateCategoria
);

export default router;
