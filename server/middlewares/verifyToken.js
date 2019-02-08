import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import db from '../db';

dotenv.config();
/**
 * Authorization: Bearer <access_token>
 * @constant
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next next object
 *
 * @returns {Object}
 *
 * @exports verifyToken
 */

const verifyToken = (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    const err = Error('User authorization token is required');
    err.statusCode = 401;
    res.status(401).json({
      status: 401,
      error: 'User authorization token is required',
    });
    return next(err);
  }

  if (token === undefined || token === null) {
    const err = Error('User authorization token is required');
    err.statusCode = 401;
    res.status(401).json({
      status: 401,
      error: 'User authorization token is required',
    });
    return next(err);
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const error = Error('Expired user authorization token');
      error.statusCode = 401;
      res.status(401).json({
        status: 401,
        error: 'Expired user authorization token',
      });
      return next(error);
    }
    const error = Error('Invalid user authorization token');
    error.statusCode = 401;
    res.status(401).json({
      status: 401,
      error: 'Invalid user authorization token',
    });
    return next(error);
  }

  return db.query('SELECT * FROM USERS WHERE ID=$1', [decoded.id])
    .then((user) => {
      if (!user.rows[0]) {
        return res.status(401).json({
          status: 401,
          error: 'Invalid user authorization token',
        });
      }
      req.userData = decoded;
      req.userId = decoded.id;
      req.isAdmin = decoded.isAdmin;
      return next();
    });
};
export default verifyToken;
