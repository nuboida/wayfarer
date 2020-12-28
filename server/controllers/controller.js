/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../services/User.services';
import Trip from '../services/Trip.services';
import Bus from '../services/Bus.service';
import getErrorMessage from '../helpers/errorHandlers';

dotenv.config();

const homepage = (req, res) => res.status(200).json({
  status: 'success',
  message: 'Welcome to Wayfarer',
});

const signup = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    password,
  } = req.body;
  try {
    const user = await new User();
    const userData = await user.create(email, firstName, lastName, password);

    const token = await jwt.sign({
      id: userData.id,
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
      algorithm: 'RS256',
    });

    return res.status(200).json({
      status: 'success',
      data: {
        user_id: userData.id,
        is_admin: userData.isadmin,
        token,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      error: getErrorMessage(err),
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await new User();
    const userData = await user.signin(email, password);

    const token = await jwt.sign({
      id: userData.id,
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });

    userData.password = undefined;

    return res.status(200).json({
      status: 'success',
      data: {
        user_id: userData.id,
        is_admin: userData.isadmin,
        token,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      error: getErrorMessage(err),
    });
  }
};

const userById = async (req, res, next, id) => {
  const user = new User();
  try {
    const userSignin = await user.getUser(id);
    req.profile = userSignin;
    next();
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      error: getErrorMessage(err),
    });
  }
};

const readUser = (req, res) => {
  req.profile.password = undefined;
  console.log(req.profile);
  return res.status(200).json({
    status: 'success',
    data: req.profile,
  });
};

const createBus = async (req, res) => {
  const {
    plateNumber,
    manufacturer,
    model,
    year,
    capacity,
  } = req.body;
  try {
    const newBus = await new Bus();
    const busData = await newBus.createBus(plateNumber, manufacturer, model, year, capacity);

    return res.status(200).json({
      status: 'success',
      data: {
        busData,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      error: getErrorMessage(err),
    });
  }
};

const viewTrips = async (req, res) => {
  const trip = new Trip();
  try {
    const allTrips = await trip.getTrips();
    return res.status(200).json({
      status: 'success',
      data: allTrips,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      error: getErrorMessage(err),
    });
  }
};

export {
  homepage,
  signup,
  signin,
  userById,
  readUser,
  createBus,
  viewTrips,
};
