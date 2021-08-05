import jwt from 'jsonwebtoken';

const generateToken = (id: number): string | undefined => {
  if (process.env.SECRETE_KEY === undefined) return;
  return jwt.sign({ id }, process.env.SECRETE_KEY, { expiresIn: '1d' });
};

export default generateToken;
