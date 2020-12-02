import { Router } from 'express';
import { homepage, signup } from '../controllers/controller';

const router = Router();

/* GET home page. */
router.get('/', homepage);
router.post('/signup', signup);
export default router;
