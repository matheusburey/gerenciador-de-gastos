import jwt from 'jsonwebtoken'

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '24h' })
}

export const decodeToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string }
  return decoded?.userId

}