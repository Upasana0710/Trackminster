import express from 'express';
import { authenticate } from '../controllers/user.js';

const router = express.Router();

router.post('/auth', authenticate);

export default router;
