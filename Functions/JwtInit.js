import jwt from 'jsonwebtoken';
import admin from '../admin.js';
export const createToken = async (
  idTokenRaw,
  data = { role: null, company: null }
) => {
  const idToken = idTokenRaw.split('Bearer ')[1];
  try {
    const { role, company } = data;
    const decoded = await admin.auth().verifyIdToken(idToken);
    const { email, name, uid } = decoded;
    const token = jwt.sign(
      { email, name, uid, role, company },
      process.env.JWT_SECRET
    );
    return token;
  } catch (error) {
    return 'no or invalid token';
  }
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};

export const isTokenValid = (token) => {
  if (!token) {
    return false;
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};
