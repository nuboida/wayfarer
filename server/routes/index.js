import { Router } from 'express';
import {
  homepage,
  signup,
  signin,
  userById,
  readUser,
  viewTrips,
  createBus,
} from '../controllers/controller';
import {
  auth,
  hasAuthorization,
  adminAuthorization,
} from '../middlewares/auth';

const router = Router();

/* GET home page. */
router.get('/', homepage);

// User
router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.param('userId', userById);
router.get('/:userId', auth, hasAuthorization, readUser);

// Create Bus
router.post('/:userId/bus', auth, adminAuthorization, createBus);

// Trips
router.get('/:userId/trips', auth, hasAuthorization, viewTrips);

export default router;
