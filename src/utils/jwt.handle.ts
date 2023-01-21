import { sign, verify, JwtPayload } from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || ''

const generateToken = (id: string) => {
  const jwt = sign({ id }, JWT_SECRET, {
    expiresIn: "2h",
  });
  return jwt;
};

const verifyToken = (jwt: string): string | JwtPayload => {
  return verify(jwt, JWT_SECRET)
}

export { generateToken, verifyToken }