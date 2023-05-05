import jwt from 'jsonwebtoken';
import { data } from '../config.js';

export const verifyToken = (req, res, next) => {
  const tkn = req.headers['x-access-token'];
  if (!tkn) {
    return res.status(401).json({ auth: false, "message": "Invalid token" });
  }
  const decoded = jwt.verify(tkn, data.secret);
  req.userId = decoded.id;
  next();
};