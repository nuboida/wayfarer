import User from '../services/User.services';
import getErrorMessage from '../helpers/errorHandlers';

const homepage = (req, res) => res.status(200).send('Wayfarer Home Page');

const signup = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    password,
  } = req.body;
  try {
    const user = await new User();
    await user.create(email, firstName, lastName, password);
    return res.status(200).json({
      status: 'success',
      user: {
        email,
        firstName,
        lastName,
      },
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
};
