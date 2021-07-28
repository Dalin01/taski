import jwt from 'jsonwebtoken';

const generateToken = (id: number): string => {
  return jwt.sign({ id }, process.env.SECRETE_KEY!, { expiresIn: '1d' });
};

export default generateToken;
