/* eslint-disable consistent-return */
import expressJwt from 'express-jwt';
import dotenv from 'dotenv';

dotenv.config();

const auth = expressJwt({
  secret: process.env.JWT_SECRET_KEY,
  algorithms: ['HS256'],
  userProperty: 'auth',
});

const hasAuthorization = (req, res, next) => {
  // const authorized = req.profile && req.auth && String(req.profile.id) === String(req.auth.id);
  if (!req.profile) {
    if (!req.auth) {
      return res.status(401).json({
        status: 'error',
        error: 'User is not signed in',
      });
    }
  }
  if (String(req.profile.id) !== String(req.auth.id)) {
    return res.status(401).json({
      status: 'error',
      error: 'User is not authorised',
    });
  }
  next();
};

const adminAuthorization = (req, res, next) => {
  if (!req.profile) {
    if (!req.auth) {
      return res.status(401).json({
        status: 'error',
        error: 'User not signed in',
      });
    }
  }
  if (String(req.profile.id) !== String(req.auth.id)) {
    return res.status(401).json({
      status: 'error',
      error: 'User is not authorised',
    });
  }
  if (!req.profile.isadmin) {
    return res.status(401).json({
      status: 'error',
      error: 'User is not authorised',
    });
  }
  next();
};

export {
  auth,
  hasAuthorization,
  adminAuthorization,
};
