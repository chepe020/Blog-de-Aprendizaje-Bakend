import { Router } from 'express';
import { addComment, getCommentsByPublication,deleteComment,updateComentario } from '../comentarios/comentarios-controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.post(
    '/:id', 
    [validarCampos],
    addComment
)

router.get(
    '/:id',
    [validarCampos],
    getCommentsByPublication
)

router.put(
    '/:id',
    [validarCampos],
    updateComentario
)

router.delete(
    '/:id',
    [validarCampos],
    deleteComment
)

export default router;
