import express from 'express';
import { getAllUsers, signin, signup } from '../controllers/user.js';
import authenticatedCheck from '../middlewares/authenticatedCheck.js';

const router = express.Router();

router.get('/', authenticatedCheck, getAllUsers)
router.post('/signup', signup)
router.post('/signin', signin)

export default router;