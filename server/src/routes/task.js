import express from 'express';
import { createTask, pieData } from '../controllers/task.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createTask);
router.post('/pie', pieData);

export default router;
