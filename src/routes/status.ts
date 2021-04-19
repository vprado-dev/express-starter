import { Router } from 'express';
import { statusGet } from '../endpoint/status';

const router = Router();

router.get('/status', statusGet);

export default router;
