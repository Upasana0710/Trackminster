import express from 'express';
import {
  createTask, pieData, barData, updateTask, deleteTask,
} from '../controllers/task.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createTask);
router.post('/pie', pieData);
router.post('/bar', barData);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
