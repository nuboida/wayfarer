import { Router } from 'express';
import {
  homepage, signup, signin, userById, readUser, viewTrips,
} from '../controllers/controller';
import { auth, hasAuthorization } from '../middlewares/auth';

const router = Router();

/* GET home page. */
router.get('/', homepage);

// User
router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.param('userId', userById);
router.get('/:userId', auth, hasAuthorization, readUser);

// Trips
router.get('/:userId/trips', viewTrips);

export default router;
