import jwt from 'jsonwebtoken';

export const createToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET);
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};

export const isTokenValid = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};
