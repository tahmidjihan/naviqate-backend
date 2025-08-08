import jwt from 'jsonwebtoken';
export const createToken = async (body) => {
  // data looks like = {email, name, company_id, role, uid}
  try {
    const token = jwt.sign(body, process.env.JWT_SECRET);
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
