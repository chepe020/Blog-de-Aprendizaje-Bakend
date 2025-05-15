import { Router } from 'express';
import { addComment, getCommentsByPublication } from '../comentarios/comentarios-controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.post(
    '/:id', 
    [validarCampos],
    addComment
);

router.get(
    '/:id',
    [validarCampos],
    getCommentsByPublication
);

export default router;
