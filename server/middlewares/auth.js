/* eslint-disable consistent-return */
import expressJwt from 'express-jwt';
import dotenv from 'dotenv';

dotenv.config();

const auth = expressJwt({
  secret: process.env.JWT_SECRET_KEY,
  userProperty: 'auth',
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && String(req.profile.id) === String(req.auth.id);
  if (!authorized) {
    return res.status(401).json({
      status: 'error',
      error: 'User is not authorized',
    });
  }
  next();
};

export {
  auth,
  hasAuthorization,
};
