const jwt = require('jsonwebtoken');
require('dotenv').config();

const HttpError = require('../util/HttpError');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authorization failed!', 401);
    }
    const decodedToken = jwt.verify(token, `${process.env.SECRET}`);
    req.userData = { userId: decodedToken._id };

    next();
  } catch (err) {
    const error = new HttpError('Authorization failed!', 401);
    return next(error);
  }
};
