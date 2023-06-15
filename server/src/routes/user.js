import express from 'express';
import { authenticate, getUser, getEmployees } from '../controllers/user.js';

const router = express.Router();

router.post('/auth', authenticate);
router.get('/employees', getEmployees);
router.get('/:id', getUser);

export default router;
