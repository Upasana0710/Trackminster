import express from 'express';
import { authenticate, getUser } from '../controllers/user.js';

const router = express.Router();

router.post('/auth', authenticate);
router.get('/:id', getUser);

export default router;
