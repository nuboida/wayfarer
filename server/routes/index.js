import { Router } from 'express';
import {
  homepage, signup, signin, userById, readUser,
} from '../controllers/controller';
import { auth, hasAuthorization } from '../middlewares/auth';

const router = Router();

/* GET home page. */
router.get('/', homepage);

// User
router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.param('userId', userById);
router.get('/users/:userId', auth, hasAuthorization, readUser);

export default router;
