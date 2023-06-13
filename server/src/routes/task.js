import express from 'express';
import { createTask } from '../controllers/task.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createTask);

export default router;
