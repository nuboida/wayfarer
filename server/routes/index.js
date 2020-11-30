import { Router } from 'express';
import { homepage } from '../controllers/controller';

const router = Router();

/* GET home page. */
router.get('/', homepage);

export default router;
