import { Router } from 'express';
import { check } from 'express-validator';
import { savePublication, getPublications, eliminarPubli, updatePubli } from './publication-controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.post(
    '/submit',
    [
        check('titulo', 'El título es obligatorio').notEmpty(),
        check('descripcion', 'La descripción es obligatoria').notEmpty(),
        check('categoria', 'La Categoria es obligatorio').notEmpty(),
        validarCampos
    ],
    savePublication
);

router.get(
    '/',
    getPublications
);

router.delete(
    '/:id',
    eliminarPubli
);

router.put(
    '/:id',
    [
        check('titulo', 'El título es obligatorio').notEmpty(),
        check('descripcion', 'La descripción es obligatoria').notEmpty(),
        check('categoria', 'La Categoria es obligatorio').notEmpty(),
        validarCampos
    ],
    updatePubli
);

export default router;
