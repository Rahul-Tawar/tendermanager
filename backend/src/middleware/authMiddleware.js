import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const verifyToken = (req, res, next) => {
  const Bearer = req.headers['authorization'];
  if (!Bearer) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  
  const token = Bearer.split(' ')[1]; // Remove 'Bearer' prefix
  
  

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

export default verifyToken;
