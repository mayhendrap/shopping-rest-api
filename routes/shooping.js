import express from 'express';
import { create, getById, getAll, updateById, deleteById } from '../controllers/shopping.js';

const router = express.Router();

router.post('/', create)
router.get('/', getAll)
router.get('/:id', getById)
router.put('/:id', updateById)
router.delete('/:id', deleteById)

export default router;