import express from 'express';
import { getTestController } from '../controllers/testonteroller.js';

const router = express.Router();

router.get('/test', getTestController);

export default router;
