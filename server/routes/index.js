import { Router } from 'express';
import { homepage, signup, signin } from '../controllers/controller';

const router = Router();

/* GET home page. */
router.get('/', homepage);
router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
export default router;
